const router = require('express').Router();
const controllers = require('./controllers/controllers');

router.get('/runner:name', controllers.runnerProfile)
router.post('/newrunner', controllers.createARunner)


module.exports = router;