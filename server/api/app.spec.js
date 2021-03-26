import express from 'express';
import app from './app.js';
import createDrawingHandler from './handlers/createDrawing.js';
import deleteDrawingHandler from './handlers/deleteDrawing.js';
import listDrawingsHandler from './handlers/listDrawings.js';
import readDrawingHandler from './handlers/readDrawing.js';

jest.mock('body-parser', () => ({
  json: () => 'mocked json body parser',
}));

jest.mock('express', () => jest.fn());

jest.mock('./createStorageDirectories.js', () => jest.fn());

describe('app', () => {
  let expressInstance;

  beforeEach(() => {
    expressInstance = {
      delete: jest.fn(),
      get: jest.fn(),
      post: jest.fn(),
      use: jest.fn(),
    };

    express.mockReturnValue(expressInstance);
  });

  it('calls createStorageDirectories', async () => {
    await app();
  })

  it('creates a new express app', async () => {
    await app();

    expect(express).toHaveBeenCalledWith();
  });

  it('uses bodyParser.json', async () => {
    await app();

    expect(expressInstance.use).toHaveBeenCalledWith('mocked json body parser');
  });

  it('registers POST /drawings', async () => {
    await app();

    expect(expressInstance.post).toHaveBeenCalledWith('/drawings', createDrawingHandler);
  });

  it('registers GET /drawings', async () => {
    await app();

    expect(expressInstance.get).toHaveBeenCalledWith('/drawings', listDrawingsHandler);
  });

  it('registers GET /drawings/:id', async () => {
    await app();

    expect(expressInstance.get).toHaveBeenCalledWith('/drawings/:id', readDrawingHandler);
  });

  it('registers DELETE /drawings/:id', async () => {
    await app();

    expect(expressInstance.delete).toHaveBeenCalledWith('/drawings/:id', deleteDrawingHandler);
  });

  it('returns the app instance', async () => {
    const actual = await app();

    expect(actual).toBe(expressInstance);
  });
});
