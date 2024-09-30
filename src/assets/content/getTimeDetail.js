const getTimeDetail = (time) => {
  const newTime = new Date(time);
  const now = new Date();
  const result = now - newTime;
  if (result < 60000) return Math.ceil(result / 1000) + 'giây';
  else if (result < 3600000) return Math.ceil(result / 60000) + ' phút';
  else if (result < 86400000) return Math.ceil(result / 3600000) + ' giờ';
  else if (result < 2592000000) return Math.ceil(result / 86400000) + ' ngày';
  else
    return (
      newTime.getHours() +
      ':' +
      newTime.getMinutes() +
      ':' +
      (newTime.getSeconds() < 10
        ? '0' + newTime.getSeconds()
        : newTime.getSeconds()) +
      ' ' +
      newTime.getDate() +
      '/' +
      (newTime.getMonth() + 1) +
      '/' +
      newTime.getFullYear()
    );
};
export default getTimeDetail;
