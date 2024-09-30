const checkShowField = (field, level, page) => {
  switch (field) {
    case 'ID':
      return false;
    case 'AID':
      return false;
    case 'civilID':
      if (level >= 2) return false;
      else return true;
    case 'salary':
      if (level >= 2) return false;
      else return true;
    case 'schedule':
      return false;
    case 'shift':
      return false;
    case 'comment':
      return false;
    case 'follow':
      return false;
    case 'createdAt':
      return false;
    case 'deleteAt':
      return false;
    case 'vip':
      return false;
    case 'money':
      return false;
    case 'opened':
      return false;
    case 'lock':
      return false;
    default:
      return true;
  }
};
export default checkShowField;
