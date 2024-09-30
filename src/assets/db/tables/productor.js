import { convertString } from '~/assets/content/checkString.js';
import request from '~/utils/request';

class Productor {
  constructor(obj) {
    if (obj) {
      this.ID = obj.ID;
      this.name = obj.name;
      this.address = obj.address;
      this.phone = obj.phone;
      this.email = obj.email;
    }
  }
  set(obj) {
    if (obj) {
      this.ID = obj.ID;
      this.name = obj.name;
      this.address = obj.address;
      this.phone = obj.phone;
      this.email = obj.email;
    }
  }
  getNew() {
    return new Productor();
  }
  getData(ID) {
    if (ID === this.ID) return true;
  }
  setID(val) {
    this.ID = val;
  }
  setName(val) {
    this.name = val;
  }
  setAddress(val) {
    this.address = val;
  }
  setPhone(val) {
    this.phone = val;
  }
  setEmail(val) {
    this.email = val;
  }
  setImage(val) {
    return;
  }
  checkDataChanged(obj) {
    if (this.ID) {
      if (this.ID !== obj.ID) {
        return true;
      }
    }
    if (this.name) {
      if (this.name !== obj.name) {
        return true;
      }
    }
    if (this.image) {
      if (this.image !== obj.image) {
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
    return false;
  }
  checkValid() {
    return true;
  }
  change(field, val) {
    switch (field) {
      case 'name':
        this.address(val);
        break;
      case 'image':
        this.phone(val);
        break;
      case 'description':
        this.email(val);
        break;
      default:
        break;
    }
  }

  find(value) {
    const newValue = value ? value.toString() : '';
    if (newValue.length > 0) {
      if (
        convertString(this.name).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.address).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.phone).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.email).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.name) === convertString(newValue) ||
        convertString(this.address) === convertString(newValue) ||
        convertString(this.phone) === convertString(newValue) ||
        convertString(this.email) === convertString(newValue)
      ) {
        return true;
      } else return false;
    }
    return false;
  }

  create() {
    request
      .post('productor/create', this)
      .then(() => {
        this.set(new Productor());
        return console.log('Update success!');
      })
      .catch(() => {
        return console.log('Add failed!');
      });
  }
  update() {
    request
      .post('productor/update/' + this.ID, this)
      .then(() => {
        return console.log('Update success!');
      })
      .catch(() => {
        return console.log('Update failed!');
      });
  }
  destroy() {
    request
      .delete('productor/delete/' + this.ID)
      .then(() => {
        return console.log('Delete success!');
      })
      .catch(() => {
        return console.log('Delete failed!');
      });
  }
  clear() {
    request
      .delete('productor/clear/' + this.ID)
      .then(() => {
        return console.log('Clear success!');
      })
      .catch(() => {
        return console.log('Clear failed!');
      });
  }
}
export default Productor;
