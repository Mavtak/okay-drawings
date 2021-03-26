import createDrawingData from '../data/createDrawing.js';
import createDrawing from './createDrawing.js';

jest.mock('../data/createDrawing.js', () => jest.fn(() =>
  'mocked-drawing-id'
));

describe('createDrawing', () => {
  let res;
  let req;

  beforeEach(() => {
    res = {
      end: jest.fn(() => res),
      json: jest.fn(() => res),
      status: jest.fn(() => res),
    };

    req = {
      body: {
        drawingProperties: 'lots of them',
      },
      headers: {
        'x-username': 'some.username',
      },
    };
  });

  describe('when the username header is not set', () => {
    beforeEach(async () => {
      delete req.headers['x-username'];

      await createDrawing(req, res);
    });

    it('sets a 401 status', () => {
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('ends the response', () => {
      expect(res.end).toHaveBeenCalledWith();
    });

    it('does not call data/createDrawing', () => {
      expect(createDrawingData).not.toHaveBeenCalled();
    });

    it('does not set json on the response', () => {
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('when the username header is set', () => {
    beforeEach(async () => {
      await createDrawing(req, res);
    });

    it('calls data/createDrawing', () => {
      expect(createDrawingData).toHaveBeenCalledWith({
        drawingProperties: 'lots of them',
        user: {
          username: 'some.username',
        },
      });
    });

    it('sets json on the response', () => {
      expect(res.json).toHaveBeenCalledWith({
        id: 'mocked-drawing-id',
      });
    });

    it('ends the response', () => {
      expect(res.end).toHaveBeenCalledWith();
    });

    it('does not set status on the response', () => {
      expect(res.status).not.toHaveBeenCalled();
    });
  });
});
