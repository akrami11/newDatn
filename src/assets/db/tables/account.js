import request from '~/utils/request';
import md5 from 'md5';
class Account {
  constructor(obj) {
    if (obj) {
      this.AID = obj.AID;
      this.username = obj.username;
      this.password = obj.password;
      this.level = obj.level;
    }
  }
  set(obj) {
    if (obj) {
      this.AID = obj.AID;
      this.username = obj.username;
      this.password = obj.password;
      this.level = obj.level;
    }
  }
  setLevel(val) {
    this.level = val;
  }
  setUsername(val) {
    this.username = val;
  }
  setPassword(val) {
    this.password = val;
  }
  setAID(val) {
    this.AID = val;
  }
  hashPassword() {
    if (this.password) {
      return this.setPassword(md5(this.password));
    }
    return true;
  }
  checkDataChanged(obj) {
    if (this.username && this.password) {
      if (this.username !== obj.username || this.password !== obj.password) {
        return true;
      }
    }
    if (this.level) {
      if (this.level !== obj.level) {
        return true;
      }
    }
    return false;
  }
  checkValid() {
    if (this.username && this.password) {
      return true;
    }
    return false;
  }
  change(field, val) {
    switch (field) {
      case 'username':
        this.setUsername(val);
        break;
      case 'password':
        this.setPassword(val);
        break;
      case 'level':
        this.setLevel(val);
        break;
      default:
        break;
    }
  }
  update() {
    this.hashPassword();
    // console.log('this.password', this.password);
    request
      .post('update/' + this.AID, this)
      .then(() => {
        return console.log('Update Account successfully!');
      })
      .catch((e) => {
        return console.log('err : ', e);
      });
  }
  create() {
    this.hashPassword();
    request
      .post('create/', this)
      .then(() => {
        return console.log('Create Account successfully!');
      })
      .catch((e) => {
        return console.log('err : ', e);
      });
  }

  delete() {
    request
      .post('delete/' + this.ID)
      .then(() => {
        return console.log('Delete Account successfully!');
      })
      .catch((e) => {
        return console.log('err : ', e);
      });
  }
}
export default Account;
