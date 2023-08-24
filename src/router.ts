import Express from 'express';
import HealthcheckController from './controllers/HealthcheckController';
import MainController from './controllers/MainController';

const router = Express.Router();

router.use('/', MainController);
router.use('/', HealthcheckController);

export default router;
