import { convertString } from '~/assets/content/checkString.js';
import request from '~/utils/request';
import images from '~/assets/images';

const getTimeFromDate = (str) => {
  if (new Date(str) !== 'Invalid Date') {
    const newDate = new Date(str);
    // console.log('ádasdasdasd', newDate);
    const newBirthDay =
      newDate.getDate() +
      '-' +
      (newDate.getMonth() + 1) +
      '-' +
      newDate.getFullYear();
    return newBirthDay;
  }
  return '';
};
// const checkDate = (date1, date2) => {
//   const newDate1 = new Date(date1);
//   const newDate2 = new Date(date2);
//   if (
//     newDate1.getDate === newDate2.getDate &&
//     newDate1.getMonth === newDate2.getMonth &&
//     newDate1.getFullYear === newDate2.getFullYear
//   ) {
//     return true;
//   } else return false;
// };
const resetDate = (str) => {
  if (typeof str === 'string') {
    const newDate = str.split('-');
    const newBirthDay = new Date(
      newDate[1] + '-' + newDate[0] + '-' + newDate[2]
    );
    return new Date(newBirthDay);
  } else return str;
};
class User {
  // constructor(ID) {
  //   this.ID = ID;
  // }
  constructor(obj) {
    if (obj) {
      this.ID = obj.ID;
      this.lastName = obj.lastName;
      this.firstName = obj.firstName;
      this.image = obj.image;
      this.dateOfBirth = obj.dateOfBirth;
      this.sex = obj.sex;
      this.address = obj.address;
      this.phone = obj.phone;
      this.civilID = obj.civilID;
      this.salary = obj.salary;
      this.schedule = obj.schedule;
      this.follow = obj.follow ? obj.follow : [];
      this.vip = obj.vip && obj.vip;
      this.money = obj.money && obj.money;
      this.opened = obj.opened ? obj.opened : [];
    }
  }
  set(obj) {
    if (obj) {
      if (obj.ID) {
        this.ID = obj.ID;
      }
      if (obj.lastName) {
        this.lastName = obj.lastName;
      }
      if (obj.firstName) {
        this.firstName = obj.firstName;
      }
      if (obj.image) {
        this.image = obj.image;
      }
      if (obj.dateOfBirth) {
        this.dateOfBirth = obj.dateOfBirth;
      }
      if (obj.sex) {
        this.sex = obj.sex;
      }
      if (obj.address) {
        this.address = obj.address;
      }
      if (obj.phone) {
        this.phone = obj.phone;
      }
      if (obj.civilID) {
        this.civilID = obj.civilID;
      }
      if (obj.salary) {
        this.salary = obj.salary;
      }
      if (obj.schedule) {
        this.schedule = obj.schedule;
      }

      if (obj.follow) {
        this.follow = obj.follow;
      }
    }
  }

  getNew() {
    return new User();
  }
  setVip(val) {
    return (this.vip = val);
  }
  setMoney(val) {
    return (this.money = val);
  }
  setOpened(val) {
    if (Array.isArray(this.opened) && this.opened.length > 0) {
      return this.opened.push(val);
    } else return (this.opened = [val]);
  }
  setLevel(value) {
    return (this.level = value);
  }
  setID(val) {
    return (this.ID = val);
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
  resetDateValue() {
    return (this.dateOfBirth = resetDate(this.dateOfBirth));
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
  setSchedule(val) { 
    return (this.schedule = val);
  }
  setWorkshift(val) {
    return (this.workshift = val);
  }
  setDatas(val) {
    return (this.data = val);
  }
  setDeletedTime(val) {
    return (this.deleteAt = val);
  }
  setRestore() {
    this.deleted = false;
    this.deleteAt = null;
  }
  setFollow(val) {
    return (this.follow = val);
  }
  getData() {
    return this.getRequest();
  }
  changeSchedule(from, to, val) {
    // if (Array.isArray(this.schedule)) {
    //   if (this.schedule.length > 0) {
    //     this.schedule = this.schedule.map((schedule) => {
    //       if (checkDate(schedule.time, time)) {
    //         return (schedule.shift = val);
    //       } else return schedule;
    //     });
    //     return true;
    //   }
    // }
    return false;
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
    if (this.salary) {
      if (this.salary !== obj.salary) {
        return true;
      }
    }
    if (this.workshift) {
      if (this.workshift !== obj.workshift) {
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
      if (this.image.preview) {
        return true;
      }
    }
    if (this.address) {
      return true;
    }
    if (this.sex) {
      return true;
    }
    if (this.phone) {
      return true;
    }
    if (this.civilID) {
      return true;
    }
    if (this.salary) {
      return true;
    }
    if (this.deleted === false) {
      return true;
    }
    // if (this.schedule) {
    //   return true;
    // }
    return false;
  }
  change(field, val, base) {
    switch (field) {
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
      case 'schedule':
        this.setSchedule(val);
        break;
      case 'workshift':
        this.setWorkshift(val);
        break;
      default:
        break;
    }
  }
  find(value) {
    const newValue = value ? value.toString() : '';
    console.log('newvalue : ', newValue);
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
        convertString(this.salary).indexOf(convertString(newValue)) >= 0 ||
        // convertString(this.schedule).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.workshift).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.ID) === convertString(newValue) ||
        convertString(this.firstName) === convertString(newValue) ||
        convertString(this.dateOfBirth) === convertString(newValue) ||
        convertString(this.sex) === convertString(newValue) ||
        convertString(this.address) === convertString(newValue) ||
        convertString(this.phone) === convertString(newValue) ||
        convertString(this.civilID) === convertString(newValue) ||
        convertString(this.salary) === convertString(newValue) ||
        // convertString(this.schedule) === convertString(newValue) ||
        convertString(this.workshift) === convertString(newValue)
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
      .get('user')
      .then((res) => {
        // call back save data
        const req = res.data.map((data) => new User(data));
        req.map((data) => {
          if (!data.image) {
            data.setImage(images.noimage);
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
    let dupicateData = false;
    if (this.checkValid) {
      request
        .get('user/getOne/' + this.ID)
        .then((res) => {
          if (res.data.ID) {
            dupicateData = true;
            return console.log('dupicate data: ' + res.data.ID);
          }
        })
        .catch(() => {
          return 1;
        });
      if (!dupicateData) {
        if (this.dateOfBirth) {
          this.resetDateValue();
        }
        let formData = new FormData();
        if (this.image) {
          formData.append('image', this.image.raw);
          delete this.image;
          request
            .post('user/create', this)
            .then(() => {
              this.set(new User());
              return console.log('Update success!');
            })
            .catch(() => {
              return console.log('Add failed!');
            });
          request
            .post('user/upload/' + this.ID, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => console.log('Error : ', err));
        } else {
          request
            .post('user/create', this)
            .then(() => {
              this.set(new User());
              return console.log('Update success!');
            })
            .catch(() => {
              return console.log('Add failed!');
            });
        }
      }
    }
  }
  update() {
    if (this.dateOfBirth) {
      this.resetDateValue();
    }
    let formData = new FormData();
    if (this.image) {
      formData.append('image', this.image.raw);
      request
        .post('user/upload/' + this.ID, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log('Error : ', err));
    }
    delete this.image;

    request
      .post('user/update/' + this.ID, this)
      .then(() => {
        return console.log('Update success!');
      })
      .catch(() => {
        return console.log('Update failed!');
      });
  }
  destroy() {
    request
      .delete('user/delete/' + this.ID)
      .then(() => {
        return console.log('Delete success!');
      })
      .catch(() => {
        return console.log('Delete failed!');
      });
  }
  clear() {
    request
      .delete('user/clear/' + this.ID)
      .then(() => {
        return console.log('Clear success!');
      })
      .catch(() => {
        return console.log('Clear failed!');
      });
  }
}
export default User;
