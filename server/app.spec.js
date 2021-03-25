import express from 'express';
import console from './console.js';
import app from './app.js';

jest.mock('./console.js', () => ({
  log: jest.fn(),
}));

jest.mock('express', () => jest.fn());

express.static = jest.fn((path) => `mocked express static "${path}"`);

jest.mock('./process.js', () => ({
  cwd: () => 'mocked current directory',
}));

jest.mock('./api/app.js', () => jest.fn(() => 'mocked api app'));

describe('app', () => {
  let expressInstance;

  beforeEach(() => {
    expressInstance = {
      listen: jest.fn(),
      get: jest.fn(),
      use: jest.fn(),
    };

    express.mockReturnValue(expressInstance);
  });

  it('creates a new express app', async () => {
    await app(123);

    expect(express).toHaveBeenCalledWith();
  });

  it('registers the api app', async () => {
    await app(123);

    expect(expressInstance.use).toHaveBeenCalledWith('/api', 'mocked api app');
  });

  it('registers the dist files', async () => {
    await app(123);

    expect(expressInstance.use('/dist', 'mocked express static "dist"'));
  });

  it('registers the catch-all route to serve the frontend app', async () => {
    await app(123);

    expect(expressInstance.get).toHaveBeenCalledWith('*', expect.any(Function));

    const handler = expressInstance.get.mock.calls.find(x => x[0] === '*')[1];
    const res = {
      sendFile: jest.fn(),
    };

    handler(null, res);

    expect(res.sendFile).toHaveBeenCalledWith('dist/index.html', {
      root: 'mocked current directory',
    });
  });

  it('starts listening on the provided port', async () => {
    await app(123);

    expect(expressInstance.listen).toHaveBeenCalledWith(123, expect.any(Function));
    expect(expressInstance.listen).toHaveBeenCalledTimes(1);

    const callback = expressInstance.listen.mock.calls[0][1];

    callback();

    expect(console.log).toHaveBeenCalledWith("okay-drawings listening on http://localhost:123")
  });

  it('returns the app instance', async () => {
    const actual = await app(123);

    expect(actual).toBe(expressInstance);
  });
});
