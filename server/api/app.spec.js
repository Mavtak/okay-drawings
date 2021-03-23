import express from 'express';
import app from './app.js';
import rootRoute from './rootRoute.js';

jest.mock('express', () => jest.fn());

describe('app', () => {
  let expressInstance;

  beforeEach(() => {
    expressInstance = {
      get: jest.fn(),
    };

    express.mockReturnValue(expressInstance);
  });

  it('creates a new express app', () => {
    app();

    expect(express).toHaveBeenCalledWith();
  });

  it('registers the root route', () => {
    app();

    expect(expressInstance.get).toHaveBeenCalledWith('/', rootRoute);
  })

  it('returns the app instance', () => {
    const actual = app();

    expect(actual).toBe(expressInstance);
  });
});
