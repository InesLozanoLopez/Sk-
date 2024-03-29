export interface ITrainings {
    _id?: string;
    runnerName: string;
    date: Date;
    distance: number;
    kmToIncrease: number;
    feedback?: string;
}

export interface IRunnerProfile {
    _id?: string;
    name: string;
    race: {
      dateRace: string;
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
    trainings?: string[];
  }