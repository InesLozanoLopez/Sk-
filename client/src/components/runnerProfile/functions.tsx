export function formatDate(data: number): string {
  const date = new Date(data);
  const day: number = date.getDate();
  const month: number = date.getMonth();

  function dayLetter(day: number): string {
    if (day === 1 || day === 21 || day === 31) {
      return `${day}st`;
    } else if (day === 2 || day === 22) {
      return `${day}nd`;
    } else if (day === 3 || day === 23) {
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
