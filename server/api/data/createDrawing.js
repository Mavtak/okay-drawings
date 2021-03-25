import fs from 'fs/promises';
import {
  v4 as uuid,
} from 'uuid';

export default async (drawing) => {
  const id = uuid();
  const storagePath = `storage/drawings/${id}.json`;
  const fileContents = JSON.stringify(drawing);

  await fs.writeFile(storagePath, fileContents);

  return id;
};
