export function getDate(dates) {
  const date = new Date(dates)
  const day = date.getDate();
  const month = date.getMonth();

  function dayLetter(day) {
    if (day[day.length - 1] === 1) {
      return `${day}st`
    } else if (day[day.length - 1] === 2) {
      return `${day}nd`
    } else if (day[day.length - 1] === 3) {
      return `${day}rd`
    } else {
      return `${day}th`
    }
  }

  const monthLetter = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return dayLetter(day) + ' of ' + monthLetter[month]
}