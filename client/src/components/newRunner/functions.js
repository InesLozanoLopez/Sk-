export function timeObjInMins(time) {
  const [hours, minutes] = time.split(':');
  return hours * 60 + parseInt(minutes, 10);
}

export function holidays(holidaysFrom, holidaysTo) {
  const days = new Date(holidaysFrom);
  const endDay = new Date(holidaysTo)
  const holidayDays = [];
  while (days <= endDay) {
    holidayDays.push(new Date(days));
    days.setDate(days.getDate() + 1);
  }
  return holidayDays;
}

export function increaseKm(kmToRun, kmToIncrease, distanceRace, longDistance) {
  if (kmToRun < Number(distanceRace)) {
    kmToRun += kmToIncrease;
  } else if (kmToRun >= Number(distanceRace) * 1.5 && Number(distanceRace) < 75) {
    kmToRun += longDistance;
  } else {
    kmToRun = longDistance;
  }
}

export function kmsPerDay(dateRace, distanceRace, longDistance, daysOff, holidaysFrom, holidaysTo, trainingsDaysFilteredHolidays) {
  const raceDay = new Date(dateRace);
  const currentDay = new Date();
  const daysUntilRaceArr = [];

  while (currentDay <= raceDay) {
    daysUntilRaceArr.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  const kmToIncreaseIntTotal = distanceRace - longDistance;
  const trainingsDaysFilteredDaysOff = daysUntilRaceArr.filter((day) => !daysOff.includes(day.getDay().toString()));

  if (holidaysFrom && holidaysTo) {
    trainingsDaysFilteredHolidays = trainingsDaysFilteredDaysOff.filter((day) => day < new Date(holidaysFrom) || day > new Date(holidaysTo));
  } else {
    trainingsDaysFilteredHolidays = trainingsDaysFilteredDaysOff
  }
  const kmPerDay = kmToIncreaseIntTotal / trainingsDaysFilteredHolidays.length;
  return kmPerDay;
}