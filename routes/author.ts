import * as express from 'express';
import controller from '../controller/author';

const router = express.Router();

router.get('/authors',  controller.getAll);

module.exports = router;