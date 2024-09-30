const getPrice = (val) => {
  if (isNaN(val)) {
    // console.log(val);
    return val;
  }
  const price = isNaN(val) ? '0' : val;
  const newPrice = price.split('').reverse();
  // let req = '';
  const req = newPrice.map((pri, index) => {
    let val = pri;
    if (index > 0 && index % 3 === 0) {
      val = val + ',';
    }
    return val;
  });
  return req.reverse().join('');
};
export default getPrice;
