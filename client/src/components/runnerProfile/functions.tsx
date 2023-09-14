export function formatDate(dates: number): string {
  const date: Date = new Date(dates);
  const day: number = date.getDate();
  const month: number = date.getMonth();

  function dayLetter(day): string {
    if (day[day.length - 1] === 1) {
      return `${day}st`;
    } else if (day[day.length - 1] === 2) {
      return `${day}nd`;
    } else if (day[day.length - 1] === 3) {
      return `${day}rd`;
    } else {
      return `${day}th`;
    }
  }

  const monthLetter: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return dayLetter(day) + ' of ' + monthLetter[month];
}
