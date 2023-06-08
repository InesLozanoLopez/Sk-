const router = require('express').Router();
const controllers = require('./controllers/controllers');

router.get('/runner', controllers.runnerProfile);
router.post('/newrunner', controllers.createARunner);
router.post('/runner', controllers.editTraining);
router.get('/runner', controllers.runnerTrainings);



module.exports = router;