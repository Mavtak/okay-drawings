import {
  validate as uuidValidate,
} from 'uuid';
import readDrawing from '../data/readDrawing.js';

export default async (req, res) => {
  const id = req.params.id;
  const drawing = uuidValidate(id)
    ? await readDrawing(id)
    : null;

  if (!drawing) {
    res
      .status(404)
      .end();
    
    return;
  }

  res
    .json(drawing)
    .end();
};
