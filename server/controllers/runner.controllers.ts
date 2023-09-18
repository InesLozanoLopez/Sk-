import { Request, Response } from "express";
import RunnerProfile from "../models/runnerSchema.models";
import Trainings from "../models/trainingSchema.models";

export const createARunner = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newRunner = req.body;
    const runnerProfile = await RunnerProfile.create({
      name: newRunner.name,
      race: {
        dateRace: newRunner.race.dateRace,
        distanceRace: newRunner.race.distanceRace,
        timeObj: newRunner.race.timeObj,
        minsPerKm: newRunner.race.minsPerKm,
      },
      currentValues: {
        longDistance: newRunner.currentValues.longDistance,
      },
      trainingAvailability: {
        daysOff: newRunner.trainingAvailability.daysOff,
        holidays: newRunner.trainingAvailability.holidays,
      },
    });
    res.status(201).send(runnerProfile);
  } catch (e) {
    console.log("Error from controllers", e);
    res.status(500).send("Internal Server Error");
  }
};

export const runnerProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const runnerInfo = await RunnerProfile.find();
    if (!runnerInfo) {
      res
        .status(400)
        .send(
          `There is not runners at the database, please, register a runner`
        );
      return;
    }
    res.status(201).send(runnerInfo);
  } catch (e) {
    console.log("Error from controllers");
    res.status(500).send("Internal Server Error");
  }
};

export const deleteRunner = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const toDeleteId = req.params.id;
    const toDelete = await RunnerProfile.findById(toDeleteId);

    if (!toDelete) {
      res.status(404).send({ message: "Runner not found" });
      return;
    }

    const trainingsId = toDelete.trainings || [];
    await Trainings.deleteMany({ _id: { $in: trainingsId } });

    await RunnerProfile.findByIdAndDelete(toDeleteId);
    res.status(201).send({ toDelete });
  } catch (e) {
    console.log("Error from controllers", e);
    res.status(500).send("Internal Server Error");
  }
};
