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
        },
        currentValues: {
          longDistance: newRunner.currentValues.currentValues.longDistance,
        },
        trainingAvailability: {
          daysPerWeek: newRunner.trainingAvailability.trainingAvailability.daysPerWeek,
          daysOff: newRunner.trainingAvailability.trainingAvailability.daysOff,
          holidays: newRunner.trainingAvailability.trainingAvailability.holidays,
        }
      });
      res.status(201).send(runnerProfile);
  
    } catch (e) {
      console.log('Error from controllers', e);
    }
  };
  
  exports.runnerProfile = async (req, res) => {
    try {
      const runnerInfo = await RunnerProfile.find();
      if (!runnerInfo) {
        res.status(400).send(`There is not runners at the database, please, register a runner`)
      }
      res.status(201).send(runnerInfo);
  
    } catch (e) {
      console.log('Error from controllers');
    }
  };

  exports.deleteRunner = async (req, res) => {
    try {
      const toDeleteId = req.params.id;
      const toDelete = await RunnerProfile.findById(toDeleteId);
  
      if(!toDelete) {
        res.status(404).send({message: 'Runner not found'})
      };
  
      const trainingsId = toDelete.trainings;
      await Training.deleteMany({_id: {$in: trainingsId}})
  
      await RunnerProfile.findByIdAndDelete(toDeleteId)
  
      res.status(201).send({ toDelete });
    } catch (e) {
      console.log('Error from controllers', e)
    }
  }
    