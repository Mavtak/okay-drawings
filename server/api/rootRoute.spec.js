import rootRoute from './rootRoute.js';

describe('rootRoute', () => {
  let res;

  beforeEach(() => {
    res = {
      json: jest.fn(),
    };

    rootRoute(null, res);
  });

  it('sets json on the response', () => {
    expect(res.json).toHaveBeenCalledWith({
      message: 'I am a very good API',
    });
  });
});
