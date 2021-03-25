import fs from 'fs/promises';

export default async (id) => {
  const storagePath = `storage/drawings/${id}.json`;

  try {
   const fileContents = await fs.readFile(storagePath);
   
   return JSON.parse(fileContents);
  }
  catch {
    return null;
  }
};
