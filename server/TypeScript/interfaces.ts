import { Types } from 'mongoose';

export interface ITrainings {
    _id: string;
    date:Date;
    distance: number;
    kmToIncrease: number;
    feedback: string | null;
}

export interface IRunnerProfile {
    _id: string;
    name: string;
    race: {
      dateRace: Date;
      distanceRace: number;
      timeObj: string;
      minsPerKm: number;
    },
    currentValues: {
      longDistance: number;
    },
    trainingAvailability: {
      daysOff: string[];
      holidays: Date[];
    },
    trainings?: Types.ObjectId[];
  }