import { convertString } from '~/assets/content/checkString.js';
import request from '~/utils/request';
// import images from '~/assets/images';

class Item {
  constructor(item) {
    if (item.PID) this.PID = item.PID;
    if (item.quantity) this.quantity = item.quantity;
    if (item.price) this.price = item.price;
  }
  checkValid() {
    if (this.PID && this.quantity && this.price) {
      return true;
    }
    return false;
  }
  checkDataChanged(array) {
    if (Array.isArray(array)) {
      let req = false;
      array.forEach((item) => {
        if (
          this.PID === item.PID &&
          this.quantity === item.quantity &&
          this.price === item.price
        ) {
          return (req = true);
        }
      });
      return !req;
    }
  }
}

class Bill {
  // constructor(ID) {
  //   this.ID = ID;
  // }
  constructor(obj) {
    if (obj) {
      if (obj.UID) this.UID = obj.UID;
      if (obj.BID) this.BID = obj.BID;
      if (obj.CID) this.CID = obj.CID;
      if (obj.PRID) this.PRID = obj.PRID;
      if (obj.items) {
        if (Array.isArray(obj.items)) {
          this.items = obj.item.map((item) => new Item(item));
        } else this.items = new Item(obj.items);
      }
      if (obj.type) this.type = obj.type;
      if (obj.deliveryDate) this.deliveryDate = obj.deliveryDate;
      if (obj.total) this.total = obj.total;
      if (obj.createAt) this.createAt = obj.createAt;
    }
  }

  set(obj) {
    if (obj.UID) this.UID = obj.UID;
    if (obj.BID) this.BID = obj.BID;
    if (obj.CID) this.CID = obj.CID;
    if (obj.PRID) this.PRID = obj.PRID;
    if (obj.items) {
      if (Array.isArray(obj.items)) {
        this.items = obj.item.map((item) => new Item(item));
      } else this.items = new Item(obj.items);
    }
    if (obj.type) this.type = obj.type;
    if (obj.deliveryDate) this.deliveryDate = obj.deliveryDate;
    if (obj.total) this.total = obj.total;
    if (obj.createAt) this.createAt = obj.createAt;
  }
  getNew() {
    return new Bill();
  }
  getItem() {
    return new Item();
  }
  setUID(val) {
    this.UID = val;
  }
  setID(val) {
    this.UID = val;
  }
  setBID(val) {
    this.BID = val;
  }
  setCID(val) {
    this.CID = val;
  }
  setPRID(val) {
    this.PRID = val;
  }
  setItem(val) {
    const newItem = new Item(val);
    if (newItem.checkValid()) return this.item.push(newItem);
    else return console.log('Invalid data Item');
  }
  setType(val) {
    this.type = val;
  }
  setDeliveryDate(val) {
    this.deliveryDate = val;
  }
  setTotal(val) {
    this.total = val;
  }

  checkDataChanged(obj) {
    if (this.UID) {
      if (this.UID !== obj.UID) {
        return true;
      }
    }
    if (this.BID) {
      if (this.BID !== obj.BID) {
        return true;
      }
    }
    if (this.CID) {
      if (this.CID !== obj.CID) {
        return true;
      }
    }
    if (this.PRID) {
      if (this.PRID !== obj.PRID) {
        return true;
      }
    }
    if (this.type) {
      if (this.type !== obj.type) {
        return true;
      }
    }
    if (Array.isArray(this.items)) {
      if (Array.isArray(obj.items)) {
        let req = false;
        if (this.items.length === obj.items.length) {
          this.items.forEach((item) => {
            if (item.checkDataChanged(obj.items)) {
              return (req = true);
            }
          });
        }
        return req;
      }
    }
    if (this.deliveryDate) {
      if (this.deliveryDate !== obj.deliveryDate) {
        return true;
      }
    }
    if (this.total) {
      if (this.total !== obj.total) {
        return true;
      }
    }

    return false;
  }
  checkValid() {
    if (this.UID) {
      return true;
    }
    if (this.BID) {
      return true;
    }
    if (this.CID) {
      return true;
    }
    if (this.PRID) {
      return true;
    }
    if (this.type) {
      return true;
    }
    if (this.deliveryDate) {
      return true;
    }
    if (this.total) {
      return true;
    }
    return false;
  }
  change(field, val, base) {
    switch (field) {
      case 'UID':
        this.setUID(val);
        break;
      case 'ID':
        this.setID(val);
        break;
      case 'BID':
        this.setBID(val);
        break;
      case 'CID':
        this.setCID(val);
        break;
      case 'PRID':
        this.setPRID(val, base);
        break;
      case 'item':
        this.setItem(val, base);
        break;
      case 'type':
        this.setType(val);
        break;
      case 'deliveryDate':
        this.setDeliveryDate(val);
        break;
      case 'total':
        this.setTotal(val);
        break;

      default:
        break;
    }
  }
  find(value) {
    const newValue = value ? value.toString() : '';
    if (newValue.length > 0) {
      if (
        convertString(this.UID).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.BID).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.CID).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.PRID).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.type).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.deliveryDate).indexOf(convertString(newValue)) >=
          0 ||
        convertString(this.total).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.UID) === convertString(newValue) ||
        convertString(this.BID) === convertString(newValue) ||
        convertString(this.CID) === convertString(newValue) ||
        convertString(this.PRID) === convertString(newValue) ||
        convertString(this.type) === convertString(newValue) ||
        convertString(this.deliveryDate) === convertString(newValue) ||
        convertString(this.total) === convertString(newValue)
      ) {
        return true;
      } else return false;
    }
    return false;
  }
  create() {
    request
      .post('bill/create', this)
      .then(() => {
        return console.log('Update success!');
      })
      .catch(() => {
        return console.log('Add failed!');
      });
  }
  update() {
    return console.log('Không thể update hóa đơn.');
  }

  destroy() {
    return console.log('Không thể xóa hóa đơn.');
  }
  clear() {
    return console.log('Không thể xóa hóa đơn.');
  }
}
export default Bill;
