import { Types } from 'mongoose';

export interface INewTraining {
    date:Date;
    distance: number;
    kmToIncrease: number;
    feedback: string | null;
}

export interface IRunnerProfile {
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

  export interface ITrainings {
    date: Date,
    distance: number,
    kmToIncrease: number,
    feedback: string
  }