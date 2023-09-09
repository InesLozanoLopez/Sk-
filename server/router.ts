import { Router } from 'express';
import * as trainingControllers from './controllers/training.controllers';
import * as runnerControllers from './controllers/runner.controllers';

const router = Router();

router.get('/runner', runnerControllers.runnerProfile);
router.post('/runner', runnerControllers.createARunner);
router.delete('/runner/:id', runnerControllers.deleteRunner);

router.get('/training', trainingControllers.runnerTrainings);
router.post('/training', trainingControllers.createTraining);
router.put('/training/:id', trainingControllers.editTrainings);
router.delete('/training/:id', trainingControllers.deleteTraining);



export default router;