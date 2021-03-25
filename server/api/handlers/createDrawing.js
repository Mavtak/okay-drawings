import createDrawing from '../data/createDrawing.js';

export default async (req, res) => {
  const username = req.headers['x-username'];
  const drawing = {
    ...req.body,
    user: {
      username,
    },
  };
  const id = await createDrawing(drawing);

  res
    .json({
      id,
    })
    .end();
};
