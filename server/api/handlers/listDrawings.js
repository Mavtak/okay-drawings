import listDrawings from '../data/listDrawings.js';

export default async (req, res) => {
  const drawings = await listDrawings();
  const result = {
    results: drawings,
  };

  res
    .json(result)
    .end();
};
