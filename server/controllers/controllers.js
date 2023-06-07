const RunnerProfile = require('../models/models')


exports.createARunner = async (req, res) => {
    try {
        const newRunner = req.body;
        const runnerProfile = await RunnerProfile.create({
            name: newRunner.name,
            race: newRunner.race,
            currentCondition:{
                longDistance: newRunner.currentCondition.longDistance,
                sprintTime: newRunner.currentCondition.sprintTime,
                sprintDistance: newRunner.currentCondition.sprintDistance
            },
            trainingAvailability:{
                daysPerWeek: newRunner.trainingAvailability.daysPerWeek,
                daysOff: newRunner.trainingAvailability.daysOff,
                holidays: newRunner.trainingAvailability.holidays,
            }
        })

        res.status(201).send(runnerProfile);

    } catch(e){
        console.log('Error from controllers')
    }
};

exports.runnerProfile = async (req, res) => {
    try{
        const runnerInfo = await RunnerProfile.findOne(req.body);
        if (!runnerInfo){
            res.status(400).send(`${req.body} doesn't exit, please, register a runner`)
        }
        res.status(201).send(runnerInfo);
    }catch(e){
        console.log('Error from controllers')
    }
    
};



