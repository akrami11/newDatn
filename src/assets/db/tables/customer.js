import { convertString } from '~/assets/content/checkString.js';
import request from '~/utils/request';
import images from '~/assets/images';

const getTimeFromDate = (str) => {
  const newDate = new Date(str);
  const newBirthDay =
    newDate.getDate() +
    '-' +
    (newDate.getMonth() + 1) +
    '-' +
    newDate.getFullYear();
  return newBirthDay;
};
const resetDate = (str) => {
  if (typeof str === 'string') {
    const newDate = str.split('-');
    const newBirthDay = new Date(
      newDate[1] + '-' + newDate[0] + '-' + newDate[2]
    );
    return new Date(newBirthDay);
  } else return str;
};
class Customer {
  // constructor(ID) {
  //   this.ID = ID;
  // }
  constructor(obj) {
    if (obj) {
      if (obj.ID) this.ID = obj.ID;
      if (obj.AID) this.AID = obj.AID;
      if (obj.firstName) this.firstName = obj.lastName;
      if (obj.lastName) this.lastName = obj.firstName;
      if (obj.image) this.image = obj.image;
      if (obj.dateOfBirth) this.dateOfBirth = obj.dateOfBirth;
      if (obj.sex) this.sex = obj.sex;
      if (obj.address) this.address = obj.address;
      if (obj.phone) this.phone = obj.phone;
      if (obj.email) this.email = obj.email;
      if (obj.authorName) this.authorName = obj.authorName;
      if (obj.civilID) this.civilID = obj.civilID;
      this.follow = obj.follow ? obj.follow : [];
      this.vip = obj.vip && obj.vip;
      this.money = obj.money && obj.money;
      this.opened = obj.opened ? obj.opened : [];
    }
  }

  set(obj) {
    this.ID = obj.ID;
    this.AID = obj.AID;
    this.lastName = obj.lastName;
    this.firstName = obj.firstName;
    this.image = obj.image;
    this.dateOfBirth = obj.dateOfBirth;
    this.sex = obj.sex ? obj.sex : 'male';
    this.address = obj.address;
    this.phone = obj.phone;
    this.email = obj.email;
    this.authorName = obj.authorName;
    this.civilID = obj.civilID;
    if (obj.follow) {
      this.follow = obj.follow;
    }
  }
  getNew() {
    return new Customer();
  }
  setVip(val) {
    return (this.vip = val);
  }
  setLevel(val) {
    return (this.level = val);
  }
  setMoney(val) {
    return (this.money = val);
  }
  setOpened(val) {
    if (Array.isArray(this.opened) && this.opened.length > 0) {
      return this.opened.push(val);
    } else return (this.opened = [val]);
  }
  setID(val) {
    return (this.ID = val);
  }
  setAID(val) {
    return (this.AID = val);
  }
  setImage(val) {
    return (this.image = val ? val : undefined);
  }
  setFirstName(val) {
    return (this.firstName = val);
  }
  setLastName(val) {
    return (this.lastName = val);
  }

  setDateOfBirth(val, base) {
    if (!base) return (this.dateOfBirth = getTimeFromDate(val));
    else return (this.dateOfBirth = val);
  }
  setSex(val, base) {
    if (!base) return (this.sex = val ? 'male' : 'female');
    else return (this.sex = val);
  }
  setAddress(val) {
    return (this.address = val);
  }
  setPhone(val) {
    return (this.phone = val);
  }
  setCivilID(val) {
    return (this.civilID = val);
  }
  setSalary(val) {
    return (this.salary = val);
  }
  setEmail(val) {
    return (this.email = val);
  }
  setAuthorName(val) {
    return (this.authorName = val);
  }
  setDatas(val) {
    return (this.data = val);
  }
  setFollow(val) {
    return (this.follow = val);
  }
  getData() {
    return this.getRequest();
  }

  resetDateValue() {
    return (this.dateOfBirth = resetDate(this.dateOfBirth));
  }
  checkDataChanged(obj) {
    if (this.firstName) {
      if (this.firstName !== obj.firstName) {
        return true;
      }
    }
    if (this.lastName) {
      if (this.lastName !== obj.lastName) {
        return true;
      }
    }

    if (this.dateOfBirth) {
      if (
        // this.dateOfBirth !== getTimeFromDate(obj.dateOfBirth) ||
        this.dateOfBirth !== obj.dateOfBirth
      ) {
        return true;
      }
    }
    if (this.image) {
      if (this.image.preview) {
        if (this.image.preview !== obj.image.preview) {
          return true;
        }
      } else if (this.image !== obj.image) {
        return true;
      }
    }
    if (this.sex) {
      if (this.sex !== obj.sex) {
        return true;
      }
    }
    if (this.address) {
      if (this.address !== obj.address) {
        return true;
      }
    }
    if (this.phone) {
      if (this.phone !== obj.phone) {
        return true;
      }
    }
    if (this.civilID) {
      if (this.civilID !== obj.civilID) {
        return true;
      }
    }

    return false;
  }
  checkValid() {
    if (this.firstName) {
      return true;
    }
    if (this.lastName) {
      return true;
    }
    if (this.dateOfBirth) {
      return true;
    }
    if (this.image) {
      if (this.image.preview.preview) {
        return true;
      }
    }
    if (this.address) {
      return true;
    }
    if (this.phone) {
      return true;
    }
    if (this.civilID) {
      return true;
    }
    return false;
  }
  change(field, val, base) {
    switch (field) {
      case 'AID':
        this.setAID(val);
        break;
      case 'firstName':
        this.setFirstName(val);
        break;
      case 'lastName':
        this.setLastName(val);
        break;
      case 'image':
        this.setImage(val);
        break;

      case 'dateOfBirth':
        this.setDateOfBirth(val, base);
        break;
      case 'sex':
        this.setSex(val, base);
        break;
      case 'address':
        this.setAddress(val);
        break;
      case 'phone':
        this.setPhone(val);
        break;
      case 'civilID':
        this.setCivilID(val);
        break;
      case 'salary':
        this.setSalary(val);
        break;
      case 'email':
        this.setEmail(val);
        break;
      case 'Shift':
        this.setShift(val);
        break;
      default:
        break;
    }
  }
  find(value) {
    const newValue = value ? value.toString() : '';
    if (newValue.length > 0) {
      if (
        convertString(this.ID).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.firstName).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.lastName).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.dateOfBirth).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.sex).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.address).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.phone).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.civilID).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.ID) === convertString(newValue) ||
        convertString(this.firstName) === convertString(newValue) ||
        convertString(this.dateOfBirth) === convertString(newValue) ||
        convertString(this.sex) === convertString(newValue) ||
        convertString(this.address) === convertString(newValue) ||
        convertString(this.phone) === convertString(newValue) ||
        convertString(this.civilID) === convertString(newValue)
      ) {
        return true;
      } else return false;
    }
    return false;
  }
  findName(value) {
    const newValue = value ? value.toString() : '';
    console.log('newvalue : ', newValue);
    if (newValue.length > 0) {
      if (
        convertString(this.firstName).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.lastName).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.firstName) === convertString(newValue) ||
        convertString(this.lastName) === convertString(newValue)
      ) {
        return true;
      } else return false;
    }
    return false;
  }

  getRequest() {
    let newUser = [];
    request
      .get('customer')
      .then((res) => {
        // call back save data
        const req = res.data.map((data) => new Customer(data));
        req.map((data) => {
          if (!data.image) {
            data.setImage(images.noImage);
          } else data.setImage('http://localhost:3001/public/' + data.image);
          return newUser.push(data);
        });
        // newUser.push(newRequest);
      })
      .catch(() => {
        return (newUser = []);
      });
    return newUser;
  }
  create() {
    if (this.dateOfBirth) {
      this.resetDateValue();
    }
    let formData = new FormData();
    if (this.image) {
      formData.append('image', this.image.raw);
      delete this.image;
      request
        .post('customer/create', this)
        .then(() => {
          return console.log('Update success!');
        })
        .catch(() => {
          return console.log('Add failed!');
        });
      request
        .post('customer/upload/' + this.ID, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log('Error : ', err));
    }
    request
      .post('customer/create', this)
      .then(() => {
        return console.log('Create success!');
      })
      .catch(() => {
        return console.log('Add failed!');
      });
  }
  update() {
    if (this.dateOfBirth) {
      this.resetDateValue();
    }
    let formData = new FormData();
    if (this.image) {
      var hasImg;
      if (this.image.raw) {
        hasImg = true;
        formData.append('image', this.image.raw);
      }
      delete this.image;
      request
        .post('customer/update/' + this.ID, this)
        .then(() => {
          return console.log('Update success!');
        })
        .catch(() => {
          return console.log('Update failed!');
        });
      if (hasImg) {
        request
          .post('customer/upload/' + this.ID, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log('Error : ', err));
      }
    } else {
      request
        .post('customer/update/' + this.ID, this)
        .then(() => {
          return console.log('Update success!');
        })
        .catch(() => {
          return console.log('Update failed!');
        });
    }
  }
  destroy() {
    request
      .delete('customer/delete/' + this.ID)
      .then(() => {
        return console.log('Delete success!');
      })
      .catch(() => {
        return console.log('Delete failed!');
      });
  }
  clear() {
    request
      .delete('customer/clear/' + this.ID)
      .then(() => {
        return console.log('Clear success!');
      })
      .catch(() => {
        return console.log('Clear failed!');
      });
  }
}
export default Customer;
