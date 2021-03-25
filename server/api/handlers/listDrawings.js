import listDrawings from '../data/listDrawings.js';

export default async (req, res) => {
  const drawings = await listDrawings({
    username: req.query.username,
  });
  const result = {
    results: drawings,
  };

  res
    .json(result)
    .end();
};
