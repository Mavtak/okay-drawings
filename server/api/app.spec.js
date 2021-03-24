import express from 'express';
import app from './app.js';
import rootRoute from './rootRoute.js';

jest.mock('body-parser', () => ({
  json: () => 'mocked json body parser',
}));

jest.mock('express', () => jest.fn());


describe('app', () => {
  let expressInstance;

  beforeEach(() => {
    expressInstance = {
      get: jest.fn(),
      post: jest.fn(),
      use: jest.fn(),
    };

    express.mockReturnValue(expressInstance);
  });

  it('creates a new express app', async () => {
    await app();

    expect(express).toHaveBeenCalledWith();
  });

  it('uses bodyParser.json', async () => {
    await app();

    expect(expressInstance.use).toHaveBeenCalledWith('mocked json body parser');
  });

  it('registers the root route', async () => {
    await app();

    expect(expressInstance.get).toHaveBeenCalledWith('/', rootRoute);
  })

  it('returns the app instance', async () => {
    const actual = await app();

    expect(actual).toBe(expressInstance);
  });
});
