export function sortBoardTasks(a, b) {
  if ( a.position > b.position ) return 1;
  if ( a.position < b.position ) return -1;
  return 0;
}

export function getCurrentDateAsString(ms) {
  const date = new Date(ms);
  const months = [
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
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const min = date.getMinutes();
  return `${month} ${day}, ${year}, ${hours}:${min}`;
}