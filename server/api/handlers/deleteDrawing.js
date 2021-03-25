import {
  validate as uuidValidate,
} from 'uuid';
import deleteDrawing from '../data/deleteDrawing.js';

export default async (req, res) => {
  const id = req.params.id;

  if (uuidValidate(id)) {
    await deleteDrawing(id);
  }

  res
    .status(204)
    .end();
};
