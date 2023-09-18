import { Request, Response } from "express";
import RunnerProfile from "../models/runnerSchema.models";
import Training from "../models/trainingSchema.models";
import { ITrainings, IRunnerProfile } from "../interfaces";

function updateDistance(distance: number, string: ITrainings) {
  if (string.feedback === "light") {
    return distance * 1.1;
  } else if (string.feedback === "hard") {
    return distance / 1.1;
  } else {
    return distance;
  }
}

function newDistance(distance: number, kmToIncrease: number, length: number) {
  const addDistance = kmToIncrease / (length - 1);
  return addDistance + distance;
}

export const createTraining = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newTraining = req.body;
    const trainings = await Training.create({
      date: newTraining.date,
      distance: newTraining.distance,
      kmToIncrease: newTraining.kmToIncrease,
      feedback: null,
    });
    const runnerName = newTraining.runnerName;
    const runnerProfile: IRunnerProfile | null = await RunnerProfile.findOne({
      name: runnerName,
    });

    if (!runnerProfile) {
      res.status(404).json({ error: "Runner profile not found" });
      return;
    }
    if (runnerProfile.trainings === undefined) {
      runnerProfile.trainings = [];
    }

    await RunnerProfile.findOneAndUpdate(
      { name: runnerName },
      { $push: {trainings: trainings._id }}
    );
    res.status(201).send(trainings);
  } catch (e) {
    console.log("Error from controllers", e);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const runnerTrainings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const trainingInfo = await Training.find();
    res.status(201).send(trainingInfo);
  } catch (e) {
    console.log("Error from controllers", e);
  }
};

export const editTrainings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const IdToEdit = req.params.id;
    const newFeedback = req.body;
    const findTraining = await Training.findById(IdToEdit).exec();

    const editedFeedback = await Training.updateOne(
      { _id: IdToEdit },
      { feedback: newFeedback.feedback }
    );

    if (newFeedback.feedback !== "hard") {
      await RunnerProfile.updateOne(
        {},
        { $set: { "currentValues.longDistance": findTraining!.distance } }
      );
    }

    const today = new Date();

    const trainingToUpdateDistance = await Training.find({
      date: {
        $gt: findTraining!.date,
        $lt: today,
      },
    }).exec();
    for (let i = 0; i < trainingToUpdateDistance.length; i++) {
      const training = trainingToUpdateDistance[i];
      const id = training._id;
      await Training.updateOne(
        { _id: id },
        { $set: { distance: updateDistance(training.distance, newFeedback) } }
      );
    }
    res.status(201).send([{ editedFeedback }]);
  } catch (e) {
    console.log("Error from controllers", e);
  }
};

export const deleteTraining = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const toDeleteId = req.params.id;
    const toDelete = await Training.findById(toDeleteId).exec();

    if (!toDelete) {
      res.status(404).send({ message: "Training not found" });
      return;
    }

    const trainingToUpdateDistance = await Training.find({
      date: { $gt: toDelete.date },
    }).exec();

    for (let i = 0; i < trainingToUpdateDistance.length; i++) {
      const training = trainingToUpdateDistance[i];
      const id = training._id;
      const currentDistance = training.distance;

      await Training.updateOne(
        { _id: id },
        {
          $set: {
            distance: newDistance(
              currentDistance,
              training.kmToIncrease,
              trainingToUpdateDistance.length
            ),
          },
        }
      );
    }
    const TrainingDeleted = await Training.findByIdAndDelete(toDeleteId);

    res.status(201).send({ TrainingDeleted });
  } catch (e) {
    console.log("Error from controllers", e);
  }
};
