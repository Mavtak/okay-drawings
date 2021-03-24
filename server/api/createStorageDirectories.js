import fs from 'fs/promises';

export default async () => {
  try {
    await fs.access('storage')
  }
  catch {
    await fs.mkdir('storage');
  }

  try {
    await fs.access('storage/drawings')
  }
  catch {
    await fs.mkdir('storage/drawings');
  }
}
