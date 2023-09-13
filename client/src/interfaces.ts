import { IRunnerProfile, ITrainings } from "../../server/TypeScript/interfaces";

export interface IFormValues {
  name: string;
  dateRace: string;
  distanceRace: number;
  timeObj: string;
  longDistance: number;
  daysOff: string[];
  holidaysFrom: string;
  holidaysTo: string;
}

export interface ITrainingProps {
  training: ITrainings;
  runnerInfo: IRunnerProfile;
  setAllTrainings: (trainings: ITrainings[]) => void;
}
