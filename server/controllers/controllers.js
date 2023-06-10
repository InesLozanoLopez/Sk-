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

exports.createTraining = async (req, res) => {
  try {
    const newTraining = req.body;
    const trainings = await Training.create({
      date: newTraining.date,
      distance: newTraining.distance,
      feedback: null
    });
    res.status(201).send(trainings);

  } catch (e) {
    console.log('Error from controllers', e)
  }
};

exports.runnerTrainings = async (req, res) => {
  try {
    const trainingInfo = await Training.find();
    res.status(201).send(trainingInfo);

  } catch (e) {
    console.log('Error from controllers', e)
  }
};

exports.editTrainings = async (req, res) => {
  try {
    const IdToEdit = req.params.id;
    const newFeedback = req.body;
    const findTraining = await Training.findById(IdToEdit).exec();

    const editedFeedback = await Training.updateOne(
      { _id: IdToEdit },
      { feedback: newFeedback.feedback }
    );

    function updatedDistance(distance, string) {
      if (string.feedback === 'light') {
        return distance * 1.1;
      } else if (string.feedback === 'hard') {
        return distance / 1.1;
      } else {
        return distance
      }
    }

    const trainingToUpdateDistance = await Training.find({ date: { $gt: findTraining.date } }).exec();
    for (let i = 0; i < trainingToUpdateDistance.length; i++) {
      const training = trainingToUpdateDistance[i];
      const id = training._id;
      await Training.updateOne(
        { _id: id },
        { $set: { distance: updatedDistance(training.distance, newFeedback) } }
      );
    }
    res.status(201).send([{ editedFeedback }]);

  } catch (e) {
    console.log('Error from controllers', e)
  }
};

exports.deleteTraining = async (req, res) => {
  try {
    const toDelete = req.params.id;
    const TrainingDeleted = await Training.findByIdAndRemove(toDelete)
    res.status(201).send({TrainingDeleted});

  }catch(e){
    console.log('Error from controllers', e)
  }
}

