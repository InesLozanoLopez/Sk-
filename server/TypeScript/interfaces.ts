import { Types } from 'mongoose';

export interface ITrainings {
    _id: string;
    date: number;
    distance: number;
    kmToIncrease: number;
    feedback: string | null;
}

export interface IRunnerProfile {
    _id: string;
    name: string;
    race: {
      dateRace: number;
      distanceRace: number;
      timeObj: string;
      minsPerKm: number;
    },
    currentValues: {
      longDistance: number;
    },
    trainingAvailability: {
      daysOff: string[];
      holidays: number[];
    },
    trainings?: Types.ObjectId[];
  }