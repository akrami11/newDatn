const getMonday = () => {
  const newTime = new Date();
  // const newTime = new Date('09 / july / 2024');
  switch (newTime.getDay()) {
    case 1 || '1':
      return newTime.getTime();
    case 2 || '2':
      return newTime.getTime() - 86400000;
    case 3 || '3':
      return newTime.getTime() - 86400000 * 2;
    case 4 || '4':
      return newTime.getTime() - 86400000 * 3;
    case 5 || '5':
      return newTime.getTime() - 86400000 * 4;
    case 6 || '6':
      return newTime.getTime() - 86400000 * 5;
    default:
      return newTime.getTime() - 86400000 * 6;
  }
};
const checkWeekDays = (time) => {
  const monday = getMonday();
  const newTime = new Date(time);
  const days = (newTime.getTime() - monday) / 86400000;
  if (days >= 0 && days < 7) {
    return days;
    // if (newTime.getTime() - monday.getTime() <= 6 * 86400000) {
    // }
  }
  return false;
};

// -86400000;

export default checkWeekDays;
