export const convertString = (str) => {
  const newStr = str ? str.toString() : '';
  console.log(str);
  let result = newStr
    .trim()
    .toLowerCase()
    .replace(' ', '')
    .replace('á', 'a')
    .replace('à', 'a')
    .replace('ạ', 'a')
    .replace('ã', 'a')
    .replace('ả', 'a')
    .replace('â', 'a')
    .replace('ậ', 'a')
    .replace('ẫ', 'a')
    .replace('ầ', 'a')
    .replace('ẩ', 'a')
    .replace('ấ', 'a')
    .replace('ă', 'a')
    .replace('ắ', 'a')
    .replace('ằ', 'a')
    .replace('ẵ', 'a')
    .replace('ặ', 'a')
    .replace('ẳ', 'a')
    .replace('é', 'e')
    .replace('è', 'e')
    .replace('ẹ', 'e')
    .replace('ẽ', 'e')
    .replace('ẻ', 'e')
    .replace('ê', 'e')
    .replace('ề', 'e')
    .replace('ế', 'e')
    .replace('ể', 'e')
    .replace('ệ', 'e')
    .replace('ễ', 'e')
    .replace('ú', 'u')
    .replace('ù', 'u')
    .replace('ụ', 'u')
    .replace('ũ', 'u')
    .replace('ủ', 'u')
    .replace('ư', 'u')
    .replace('ừ', 'u')
    .replace('ứ', 'u')
    .replace('ử', 'u')
    .replace('ự', 'u')
    .replace('ữ', 'u')
    .replace('í', 'i')
    .replace('ì', 'i')
    .replace('ị', 'i')
    .replace('ĩ', 'i')
    .replace('ỉ', 'i')
    .replace('ó', 'o')
    .replace('ò', 'o')
    .replace('ọ', 'o')
    .replace('õ', 'o')
    .replace('ỏ', 'o')
    .replace('ô', 'o')
    .replace('ố', 'o')
    .replace('ồ', 'o')
    .replace('ổ', 'o')
    .replace('ộ', 'o')
    .replace('ỗ', 'o')
    .replace('ơ', 'o')
    .replace('ớ', 'o')
    .replace('ờ', 'o')
    .replace('ợ', 'o')
    .replace('ỡ', 'o')
    .replace('ở', 'o')
    .replace('ý', 'y')
    .replace('ỳ', 'y')
    .replace('ỵ', 'y')
    .replace('ỹ', 'y')
    .replace('đ', 'd');
  return result;
};
export const checkInputEditable = (input) => {
  let newInput = input
    .replaceAll(`<div><br></div>`, ' ')
    .replaceAll(`<div>`, '')
    .replaceAll(`</div>`, '')
    .replaceAll('<br>', '\n')
    .trim()
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&amp;', '&')
    .replaceAll('&gt;', '>')
    .replaceAll('&lt;', '< ');
  if (newInput === ' ') {
    return null;
  }
  return newInput;
};

export const convertPhone = (pre, phone) => {
  if (phone.length > 10) {
    return pre.trim();
  }
  if (phone.length < pre.length) {
    return phone.trim();
  }
  if (isNaN(phone.at(pre.length))) {
    return pre.trim();
  }
  return phone.trim();
};
export const convertNameItem = (name) => {
  let newName = '';
  if (name) {
    if (name.length > 15) {
      newName = name.slice(0, 15);
      newName = newName.concat('...');
      return newName;
    }
  }
  return name;
};
export const clearEnter = (str) => {
  return str.replace('<div><br> </div>', '').replace('<div><br></div>', '');
};
