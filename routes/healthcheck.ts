import * as express from 'express';
import * as controller from '../controller/healthcheck';

const router = express.Router();

router.get('/healthcheck',  controller.check);

module.exports = router;