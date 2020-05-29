function convertDataToCorrectString(data) {
  return data < 10 ? `0${data}` : `${data}`;
}

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
  const hours = convertDataToCorrectString(date.getHours());
  const min = convertDataToCorrectString(date.getMinutes());
  return `${month} ${day}, ${year}, ${hours}:${min}`;
}

