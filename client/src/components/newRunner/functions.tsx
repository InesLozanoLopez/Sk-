export function timeObjInMins(time) {
  const [hours, minutes] = time.split(":");
  return hours * 60 + parseInt(minutes, 10);
}

export function holidays({ holidaysFrom, holidaysTo }: {holidaysFrom: string, holidaysTo: string}):Date[] {
  const days = new Date(Number(holidaysFrom));
  const endDay = new Date(Number(holidaysTo));
  const holidayDays: Date[] = [];
  while (days <= endDay) {
    holidayDays.push(new Date(days));
    days.setDate(days.getDate() + 1);
  }
  return holidayDays;
}

export function increaseKm({
  distanceRace,
  ableToRun,
  daysToTraining,
}: 
{distanceRace: number,
ableToRun: number,
daysToTraining: number,
}): number {
  const kmToIncreaseIntTotal = distanceRace - ableToRun;
  const kmPerDayToIncrease = kmToIncreaseIntTotal / daysToTraining;
  return kmPerDayToIncrease;
}

export function kmsPerDay({ ableToRun, kmToIncrease, distanceRace }): number {
  if (ableToRun < Number(distanceRace)) {
    return (ableToRun += kmToIncrease);
  } else if (
    ableToRun >= Number(distanceRace) * 1.5 &&
    Number(distanceRace) < 75
  ) {
    return (ableToRun += kmToIncrease);
  } else {
    return ableToRun;
  }
}

export function daysAvailable({
  dateRace,
  daysOff,
  holidaysFrom,
  holidaysTo,
}): Date[] {
  const raceDay = new Date(dateRace);
  const currentDay = new Date();
  const daysUntilRaceArr: Date[] = [];

  let trainingsDaysFilteredHolidays: Date[] = [];

  while (currentDay <= raceDay) {
    daysUntilRaceArr.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  const trainingsDaysFilteredDaysOff = daysUntilRaceArr.filter(
    (day) => !daysOff.includes(day.getDay().toString())
  );

  if (holidaysFrom && holidaysTo) {
    trainingsDaysFilteredHolidays = trainingsDaysFilteredDaysOff.filter(
      (day) => day < new Date(holidaysFrom) || day > new Date(holidaysTo)
    );
  } else {
    trainingsDaysFilteredHolidays = trainingsDaysFilteredDaysOff;
  }
  return trainingsDaysFilteredHolidays;
}
