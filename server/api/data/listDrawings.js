import fs from 'fs/promises';
import readDrawing from './readDrawing.js'

export default async () => {
  const filenames = await fs.readdir('storage/drawings');
  const ids = filenames.map(x => x.replace(/[.]json$/, ''));
  const drawings = await Promise.all(
    ids.map(readDrawing)
  );

  return drawings;
}
