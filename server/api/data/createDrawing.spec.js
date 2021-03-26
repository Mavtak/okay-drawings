import fs from 'fs/promises';
import createDrawing from './createDrawing.js';

jest.mock('fs/promises', () => ({
  writeFile: jest.fn(),
}));

jest.mock('uuid', () => ({
  v4: () => 'mocked-uuid',
}));

describe('createDrawing', () => {
  it('writes the file', async () => {
    await createDrawing({
      drawingData: 'lots of properties',
    });

    expect(fs.writeFile).toHaveBeenCalledWith(
      'storage/drawings/mocked-uuid.json',
      '{"drawingData":"lots of properties"}'
    );
  });

  it('returns the genreated ID', async () => {
    const actual = await createDrawing({
      drawingData: 'lots of properties',
    });

    expect(actual).toBe('mocked-uuid');
  });
});
