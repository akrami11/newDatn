const setPrice = (price) => {
  const newPrice = price.split(',');
  let result = '';
  newPrice.map((price) => (result += price));
  return result;
};
export default setPrice;
