import { Request, Response } from "express";
import RunnerProfile, {
  RunnerProfileDocument,
} from "../models/runnerSchema.models";
import Training from "../models/trainingSchema.models";

export const createARunner = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newRunner = req.body;
    const runnerProfile = await RunnerProfile.create<RunnerProfileDocument>({
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
        daysPerWeek:
          newRunner.trainingAvailability.trainingAvailability.daysPerWeek,
        daysOff: newRunner.trainingAvailability.trainingAvailability.daysOff,
        holidays: newRunner.trainingAvailability.trainingAvailability.holidays,
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
    await Training.deleteMany({ _id: { $in: trainingsId } });

    await RunnerProfile.findByIdAndDelete(toDeleteId);

    res.status(201).send({ toDelete });
  } catch (e) {
    console.log("Error from controllers", e);
    res.status(500).send("Internal Server Error");
  }
};
