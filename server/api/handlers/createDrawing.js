import createDrawing from '../data/createDrawing.js';

export default async (req, res) => {
  const drawing = req.body;
  const id = await createDrawing(drawing);

  res
    .json({
      id,
    })
    .end();
};
