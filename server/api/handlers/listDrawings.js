import listDrawings from '../data/listDrawings.js';

export default async (req, res) => {
  const username = req.headers['x-username'];
  const drawings = await listDrawings({
    username
  });
  const result = {
    results: drawings,
  };

  res
    .json(result)
    .end();
};
