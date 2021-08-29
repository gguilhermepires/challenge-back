import * as express from 'express';
import controller from '../controller/book';

const router = express.Router();

router.post('/books', controller.add);
router.get('/books', controller.getAll);
router.get('/books/:id', controller.get);
router.put('/books/:id', controller.update);
router.delete('/books/:id', controller.remove);

module.exports = router;