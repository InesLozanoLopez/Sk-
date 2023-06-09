const RunnerProfile = require('../models/runnerSchema.models');
const Training = require('../models/trainingSchema.models');


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
                // sprintTime: newRunner.currentValues.currentValues.sprintTime,
                // sprintDistance: newRunner.currentValues.currentValues.sprintDistance
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

exports.createTraining = async (req, res) => {
    try{
        const newTraining = req.body;
        const trainings = await Training.create({
            date: newTraining.date,
            distance: newTraining.distance,
            // timePerKm: newTraining.timePerKm,
            feedback: null
        });
        res.status(201).send(trainings);

    }catch(e){
        console.log('Error from controllers', e)
    }
}

exports.runnerTrainings = async (req, res) => {
    try{
        const trainingInfo = await Training.find();
        res.status(201).send(trainingInfo);
        
    }catch(e){
        console.log('Error from controllers', e)
    }
}

exports.editTrainings = async (req, res) => {
    try{
        const IdToEdit = req.params.id;
        const newFeedback= req.body;
        const findTraining = await Training.findById(IdToEdit).exec();
        const currentDistance = Number(findTraining.distance);

        function updatedDistance(string){
            if(string.feedback === 'light'){
                return currentDistance * 1.1;
            } else if(string.feedback === 'hard'){
                return currentDistance / 1.1;
            }else{
                return currentDistance;
            }
        }

        const editedDistance = await Training.updateMany(
            {date: {$gt:findTraining.date}}, 
            {$set: {distance: updatedDistance(newFeedback)}}
        )

        const editedFeedback = await Training.updateOne(
            {_id: IdToEdit},
            {feedback: newFeedback.feedback}
        )
        res.status(201).send([{findTraining}]);
    }catch(e){
        console.log('Error from controllers', e)
    }
}

