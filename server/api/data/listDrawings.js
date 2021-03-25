import fs from 'fs/promises';
import readDrawing from './readDrawing.js'

export default async ({
  username,
}) => {
  const filenames = await fs.readdir('storage/drawings');
  const ids = filenames.map(x => x.replace(/[.]json$/, ''));
  const allDrawings = await Promise.all(
    ids.map(readDrawing)
  );
  const drawings = allDrawings.filter((drawing) => (
    drawing.isPublic ||
    (drawing.user.username === username)
  ));

  return drawings;
}
