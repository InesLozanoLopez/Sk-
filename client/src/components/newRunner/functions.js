export function timeObjInMins(time) {
  const [hours, minutes] = time.split(':');
  return hours * 60 + parseInt(minutes, 10);
}

export function holidays({holidaysFrom, holidaysTo}) {
  const days = new Date(holidaysFrom);
  const endDay = new Date(holidaysTo)
  const holidayDays = [];
  while (days <= endDay) {
    holidayDays.push(new Date(days));
    days.setDate(days.getDate() + 1);
  }
  return holidayDays;
}

export function increaseKm({distanceRace, longDistance, daysToTraining}) {
  const kmToIncreaseIntTotal = distanceRace - longDistance;
  const kmPerDayToIncrease = kmToIncreaseIntTotal / daysToTraining;
  return kmPerDayToIncrease;
}

export function kmsPerDay({ableToRun, kmToIncrease, distanceRace}) {
  if (ableToRun < Number(distanceRace)) {
    return ableToRun += kmToIncrease;
  } else if (ableToRun >= Number(distanceRace) * 1.5 && Number(distanceRace) < 75) {
    return ableToRun += kmToIncrease;
  } else {
    return ableToRun;
  }
}

export function daysAvailable({dateRace, daysOff, holidaysFrom, holidaysTo}) {
  const raceDay = new Date(dateRace);
  const currentDay = new Date();
  const daysUntilRaceArr = [];

  let trainingsDaysFilteredHolidays = [];


  while (currentDay <= raceDay) {
    daysUntilRaceArr.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  const trainingsDaysFilteredDaysOff = daysUntilRaceArr.filter((day) => !daysOff.includes(day.getDay().toString()));

  if (holidaysFrom && holidaysTo) {
    trainingsDaysFilteredHolidays = trainingsDaysFilteredDaysOff.filter((day) => day < new Date(holidaysFrom) || day > new Date(holidaysTo));
  } else {
    trainingsDaysFilteredHolidays = trainingsDaysFilteredDaysOff
  }
  return trainingsDaysFilteredHolidays
}