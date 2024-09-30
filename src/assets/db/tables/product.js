import { convertString } from '~/assets/content/checkString.js';
import request from '~/utils/request';
import Comment from './comment.js';

const setArrayComment = (array) => {
  if (Array.isArray(array)) {
    const newArray = array.map((item) => new Comment(item));
    return newArray;
  } else return [new Comment(array)];
};

const splitString = (str) => {
  if (typeof str === 'string') {
    if (str.length > 2) {
      return str.split(',');
    }
  }
  return str;
};

class Product {
  constructor(obj) {
    if (obj) {
      this.ID = obj.ID;
      this.name = obj.name;
      this.image = obj.image;
      this.description = obj.description;
      this.tag = splitString(obj.tag);
      this.price = obj.price;
      this.quantity = obj.quantity;
      this.sale = obj.sale;
      this.PRID = obj.PRID;
      this.AuthorID = obj.AuthorID;
      this.LID = obj.LID;
      this.views = obj.views;
      this.series = obj.series ? obj.series : '';
      this.comment = setArrayComment(obj.comment);
      this.hide = obj.hide;
    }
  }
  set(obj) {
    if (obj) {
      if (obj.ID) this.ID = obj.ID;
      if (obj.name) this.name = obj.name;
      if (obj.image) this.image = obj.image;
      if (obj.description) this.description = obj.description;
      if (obj.tag) this.tag = obj.tag;
      if (obj.price) this.price = obj.price;
      if (obj.quantity) this.quantity = obj.quantity;
      if (obj.sale) this.sale = obj.sale;
      if (obj.PRID) this.PRID = obj.PRID;
      if (obj.AuthorID) this.AuthorID = obj.AuthorID;
      if (obj.LID) this.LID = obj.LID;
    }
  }
  getNew() {
    return new Product();
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
  addViews(val) {
    request
      .post('product/update/' + this.ID, { views: val })
      .then(() => {
        return console.log('Update success!');
      })
      .catch(() => {
        return console.log('Update failed!');
      });
  }
  setImage(val) {
    this.image = val;
  }
  setDescription(val) {
    this.description = val;
  }
  setComment(val) {
    if (Array.isArray(this.comment)) {
      this.comment.reverse().push(val);
      return this.comment.reverse();
    } else this.comment = [val];
  }
  setTag(val) {
    this.tag = val;
  }
  setPrice(val) {
    this.price = val;
  }
  setQuantity(val) {
    this.quantity = val;
  }
  setSale(val) {
    this.sale = val;
  }
  setPRID(val) {
    this.PRID = val;
  }
  setAuthorID(val) {
    this.AuthorID = val;
  }
  setLID(val) {
    this.LID = val;
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
    if (this.description) {
      if (this.description !== obj.description) {
        return true;
      }
    }
    if (this.tag) {
      if (this.tag !== obj.tag) {
        return true;
      }
    }
    if (this.price) {
      if (this.price !== obj.price) {
        return true;
      }
    }
    if (this.quantity) {
      if (this.quantity !== obj.quantity) {
        return true;
      }
    }
    if (this.sale) {
      if (this.sale !== obj.sale) {
        return true;
      }
    }
    if (this.PRID) {
      if (this.PRID !== obj.PRID) {
        return true;
      }
    }
    if (this.AuthorID) {
      if (this.AuthorID !== obj.AuthorID) {
        return true;
      }
    }
    if (this.LID) {
      if (this.LID !== obj.LID) {
        return true;
      }
    }
    if (this.hide !== null || this.hide !== undefined) return true;
    return false;
  }
  checkValid() {
    if (this.name) return true;
    if (this.image) return true;
    if (this.description) return true;
    if (this.tag) return true;
    if (this.price) return true;
    if (this.quantity) return true;
    if (this.sale) return true;
    if (this.PRID) return true;
    if (this.AuthorID) return true;
    if (this.hide !== null || this.hide !== undefined) return true;
    if (this.LID) return true;
    return false;
  }
  change(field, val) {
    switch (field) {
      case 'hide':
        this.hide = val;
        break;
      case 'name':
        this.setName(val);
        break;
      case 'image':
        this.setImage(val);
        break;
      case 'description':
        this.setDescription(val);
        break;
      case 'tag':
        this.setTag(val);
        break;
      case 'price':
        this.setPrice(val);
        break;
      case 'quantity':
        this.setQuantity(val);
        break;
      case 'sale':
        this.setSale(val);
        break;
      case 'PRID':
        this.setPRID(val);
        break;
      case 'AuthorID':
        this.setAuthorID(val);
        break;
      case 'LID':
        this.setLID(val);
        break;
      default:
        break;
    }
  }
  findByName(value) {
    const newValue = value ? value.toString() : '';
    console.log(newValue);
    if (newValue.length > 0) {
      if (
        convertString(this.name).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.name) === convertString(newValue)
      ) {
        return true;
      } else return false;
    }
    return false;
  }
  findByTag(value) {
    const newArray = this.tag;
    if (Array.isArray(newArray)) {
      // newArray.map((tg) => {
      const index = newArray.findIndex((val) => Number(val) === Number(value));
      return index >= 0;
      // });
      // return true;
    }

    return false;
  }
  findByAuthorID(arr) {
    const index = arr.findIndex((data) => {
      return data.ID === this.AuthorID;
    });
    return arr[index];
  }
  find(value) {
    const newValue = value ? value.toString() : '';
    if (newValue.length > 0) {
      if (
        convertString(this.name).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.image).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.tag).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.price).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.quantity).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.sale).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.PRID).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.AuthorID).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.LID).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.name) === convertString(newValue) ||
        convertString(this.image) === convertString(newValue) ||
        convertString(this.tag) === convertString(newValue) ||
        convertString(this.price) === convertString(newValue) ||
        convertString(this.quantity) === convertString(newValue) ||
        convertString(this.sale) === convertString(newValue) ||
        convertString(this.PRID) === convertString(newValue) ||
        convertString(this.AuthorID) === convertString(newValue) ||
        convertString(this.LID) === convertString(newValue)
      ) {
        return true;
      } else return false;
    }
    return false;
  }

  create() {
    let formData = new FormData();
    this.hide = true;
    if (this.image) {
      formData.append('image', this.image.raw);
      delete this.image;
      request
        .post('product/create', this)
        .then(() => {
          request
            .post('product/upload/' + this.ID, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => console.log('Error : ', err));
          this.set(new Product());
          return console.log('Update success!');
        })
        .catch(() => {
          return console.log('Add failed!');
        });
    } else
      request
        .post('product/create', this)
        .then(() => {
          this.set(new Product());
          return console.log('Update success!');
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
      formData.append('image', this.image.raw);
      delete this.image;
      request
        .post('product/upload/' + this.ID, formData, {
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
      .post('product/update/' + this.ID, this)
      .then(() => {
        return console.log('Update success!');
      })
      .catch(() => {
        return console.log('Update failed!');
      });
  }
  destroy() {
    request
      .delete('product/delete/' + this.ID)
      .then(() => {
        return console.log('Delete success!');
      })
      .catch(() => {
        return console.log('Delete failed!');
      });
  }
  clear() {
    request
      .delete('product/clear/' + this.ID)
      .then(() => {
        return console.log('Clear success!');
      })
      .catch(() => {
        return console.log('Clear failed!');
      });
  }
}
export default Product;
