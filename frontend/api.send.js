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
};
