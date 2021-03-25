import fs from 'fs/promises';

export default async (id) => {
  const storagePath = `storage/drawings/${id}.json`;
  
  await fs.unlink(storagePath);
};
