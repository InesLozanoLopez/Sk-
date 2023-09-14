import { ITrainings } from '../../../../server/interfaces';

export function allTrainingByMonth(allTrainings: ITrainings[]) {
  const trainingsByMonth = {};

  allTrainings.map((training: ITrainings) => {
    const date = new Date(training.date);
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthLetter = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const key = `${monthLetter[month]}-${year}`;

    if (!trainingsByMonth[key]) {
      trainingsByMonth[key] = [];
    }
    trainingsByMonth[key].push(training);
  });
  return trainingsByMonth;
}
