const router = require('express').Router();
const trainingControllers = require('./controllers/training.controllers');
const runnerControllers = require('./controllers/runner.controllers')

router.get('/runner', runnerControllers.runnerProfile);
router.post('/runner', runnerControllers.createARunner);
router.delete('/runner/:id', runnerControllers.deleteRunner);

router.get('/training', trainingControllers.runnerTrainings);
router.post('/training', trainingControllers.createTraining);
router.put('/training/:id', trainingControllers.editTrainings);
router.delete('/training/:id', trainingControllers.deleteTraining);



module.exports = router;