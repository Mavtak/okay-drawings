import fs from 'fs/promises';

export default async (id) => {
  const storagePath = `storage/drawings/${id}.json`;

  try {
   const fileContents = await fs.readFile(storagePath);
   const drawing = {
     ...JSON.parse(fileContents),
     id: id,
   };

   return drawing;
  }
  catch {
    return null;
  }
};
