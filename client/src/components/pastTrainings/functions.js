export function allTrainingByMonth(allTrainings) {
  const trainingsByMonth = {};

  allTrainings.map((training) => {
    const date = new Date(training.date);
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthLetter = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const key = `${monthLetter[month]}-${year}`;
    
    if(!trainingsByMonth[key]) {
      trainingsByMonth[key] = [];
    }
    trainingsByMonth[key].push(training);
  })
  return trainingsByMonth;

}