import errorStream from './errorStream.js';
import userSession from './userSession.js';

export default async ({
  body,
  method,
  path,
  query,
}) => {
  const formattedPath = '/' + ['api', ...path]
    .map(encodeURIComponent)
    .join('/');
  const querystring = (query && Object.keys(query).length > 0)
    ? (
      '?' + Object.entries(query)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')
    )
    : '';
  const user = userSession.get();
  let headers = {
    'Content-Type': 'application/json',
  };
  
  if (user) {
    headers['X-Username'] = user.username;
  }

  try {
    const response = await fetch(`${formattedPath}${querystring}`, {
      body: body && JSON.stringify(body),
      headers,
      method,
    });

    const responseBody = response.headers.get('Content-Type')?.startsWith('application/json')
      ? await response.json()
      : null;

    const result = {
      status: response.status,
      body: responseBody,
    };

    return result;
  }
  catch (exception) {
    window.blep = exception;

    if (exception.message === 'Failed to fetch') {
      errorStream.publish({
        message: 'oh hun ☺ it looks like your beautiful computer isn\'t online',
      });
    }
    else {
      errorStream.publish({
        message: 'oh uh! I think I messed up. could you try refreshing me?',
      });
    }

    throw exception;
  }
};
