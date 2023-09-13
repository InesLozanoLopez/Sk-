import db from "./db";
import { Model } from "mongoose";
import { IRunnerProfile } from "../interfaces";

const profileSchema = new db.Schema<IRunnerProfile>({
  name: {
    type: String,
    required: true,
  },
  race: {
    dateRace: {
      type: Date,
      required: true,
    },
    distanceRace: {
      type: Number,
      required: true,
    },
    timeObj: {
      type: String,
      required: true,
    },
    minsPerKm: {
      type: Number,
      required: true,
    },
  },
  currentValues: {
    longDistance: {
      type: Number,
      required: true,
    },
  },
  trainingAvailability: {
    daysOff: {
      type: [String],
      required: true,
    },
    holidays: {
      type: [Date],
      required: true,
    },
  },
  trainings: {
    type: [db.Schema.Types.ObjectId],
  },
});

const RunnerProfile: Model<IRunnerProfile> = db.model<IRunnerProfile>("RunnerProfile", profileSchema);

export default RunnerProfile;
