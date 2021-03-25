import {
  validate as uuidValidate,
} from 'uuid';
import deleteDrawing from '../data/deleteDrawing.js';
import readDrawing from '../data/readDrawing.js';

export default async (req, res) => {
  const id = req.params.id;
  const username = req.headers['x-username'];

  if (uuidValidate(id)) {
    const drawing = await readDrawing(id);

    if (drawing) {
      if (drawing.user.username !== username) {
        res
          .status(403)
          .end();

        return;
      }

      await deleteDrawing(id);
    }
  }

  res
    .status(204)
    .end();
};
