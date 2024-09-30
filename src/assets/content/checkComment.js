const checkComment = (val) => {
  var newValue = val.toString();
  return newValue
    .trim()
    .replace('ccc', '***')
    .replace('qq', '**')
    .replace('abcd', '***')
    .replace('xyz', '***');
};
export default checkComment;
