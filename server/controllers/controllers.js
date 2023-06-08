const RunnerProfile = require('../models/models')


exports.createARunner = async (req, res) => {
    try {
        const newRunner = req.body;
        const runnerProfile = await RunnerProfile.create({
            name: newRunner.name,
            race: {
                dateRace: newRunner.race.race.dateRace,
                distanceRace: newRunner.race.race.distanceRace,
                timeObj: newRunner.race.race.timeObj,
                minsPerKm: newRunner.race.race.minsPerKm,
                elevation: newRunner.race.race.elevation
            },
            currentValues:{
                longDistance: newRunner.currentValues.currentValues.longDistance,
                sprintTime: newRunner.currentValues.currentValues.sprintTime,
                sprintDistance: newRunner.currentValues.currentValues.sprintDistance
            },
            trainingAvailability:{
                daysPerWeek: newRunner.trainingAvailability.trainingAvailability.daysPerWeek,
                daysOff: newRunner.trainingAvailability.trainingAvailability.daysOff,
                holidays: newRunner.trainingAvailability.trainingAvailability.holidays,
            }
        })

        res.status(201).send(runnerProfile);

    } catch(e){
        console.log('Error from controllers', e)
    }
};

exports.runnerProfile = async (req, res) => {
    try{
        const runnerInfo = await RunnerProfile.find();
        if (!runnerInfo){
            res.status(400).send(`There is not runners at the database, please, register a runner`)
        }
        res.status(201).send(runnerInfo);
    }catch(e){
        console.log('Error from controllers')
    }
    
};



