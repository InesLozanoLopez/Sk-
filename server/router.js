const router = require('express').Router();
const controllers = require('./controllers/controllers');

router.get('/runner', controllers.runnerProfile);
router.post('/runner', controllers.createARunner);
router.post('/training', controllers.createTraining);
router.get('/training', controllers.runnerTrainings);



module.exports = router;