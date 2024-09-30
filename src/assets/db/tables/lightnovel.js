import { convertString } from '~/assets/content/checkString.js';
import request from '~/utils/request';
import Comment from './comment.js';

const setArrayComment = (array) => {
  if (Array.isArray(array)) {
    const newArray = array.map((item) => new Comment(item));
    return newArray;
  } else return [new Comment(array)];
};

class LightNovel {
  constructor(obj) {
    if (obj) {
      this.ID = obj.ID;
      this.LID = obj.LID;
      this.AuthorID = obj.AuthorID;
      this.volume = obj.volume;
      this.chapter = obj.chapter;
      this.file = obj.file;
      this.name = obj.name;
      this.image = obj.image;
      this.views = obj.views;
      this.comment = setArrayComment(obj.comment);
      this.lock = obj.lock;
      this.createdAt = obj.createdAt;
    }
  }
  set(obj) {
    if (obj) {
      if (obj.ID) this.ID = obj.ID;
      if (obj.LID) this.LID = obj.LID;
      if (obj.AuthorID) this.AuthorID = obj.AuthorID;
      if (obj.volume) this.volume = obj.volume;
      if (obj.chapter) this.chapter = obj.chapter;
      if (obj.image) this.image = obj.image;
      if (obj.name) this.name = obj.name;
      if (obj.file) this.file = obj.file;
      if (obj.views) this.views = obj.views;
      if (obj.comment) this.comment = obj.comment;
    }
  }
  getNew() {
    return new LightNovel();
  }
  getData(LID) {
    if (LID === this.LID) return true;
  }
  setID(val) {
    this.ID = val;
  }
  setLID(val) {
    this.LID = val;
  }
  setAuthorID(val) {
    this.AuthorID = val;
  }
  setVolume(val) {
    this.volume = val;
  }
  setChapter(val) {
    this.chapter = val;
  }
  setContent(val) {
    this.content = val;
  }
  setNewContent(val) {
    this.newContent.push(val);
  }
  setImage(val) {
    this.image = val;
  }
  setViews(val) {
    this.views = val;
  }
  setName(val) {
    this.name = val;
  }
  setFile(val) {
    this.file = val;
  }
  setComment(val) {
    if (Array.isArray(this.comment)) {
      this.comment.reverse().push(val);
      return this.comment.reverse();
    } else this.comment = [val];
  }
  addView() {
    const newLN = { views: Number(this.views) + 1 };
    request
      .post('lightnovel/update/' + this.ID, newLN)
      .then(() => {
        return console.log('Add view success!');
      })
      .catch(() => {
        return console.log('Add view failed!');
      });
  }
  // like(uid, _id) {
  //   if (Array.isArray(this.comment)) {
  //     this.comment.map((cmt) => {
  //       if (cmt._id === _id) {
  //         cmt.like(uid);
  //         return true;
  //       } else return false;
  //     });
  //   }
  // }
  // dislike(uid, _id) {
  //   if (Array.isArray(this.comment)) {
  //     this.comment.map((cmt) => {
  //       if (cmt._id === _id) {
  //         cmt.dislike(uid);
  //         return true;
  //       } else return false;
  //     });
  //   }
  // }
  // deleteComment(uid, _id) {
  //   if (Array.isArray(this.comment)) {
  //     this.comment.map((cmt) => {
  //       if (cmt._id === _id) {
  //         if (cmt.UID === uid) {
  //           cmt.delete();
  //         }
  //       }
  //       return false;
  //     });
  //   }
  // }
  getContent(part) {
    if (Array.isArray(this.content)) {
      const newPart = part.toString();
      let req = {};
      this.content.forEach((data) => {
        // console.log(data.part, newPart);
        if (data.part === newPart) return (req = data);
      });
      return req;
    }
    return 1;
  }
  getPart(part) {
    if (Array.isArray(this.content)) {
      const newPart = part.toString();
      let pre = '';
      let next = '';
      const newIndex = this.content.findIndex((data) => data.part === newPart);
      // console.log(newIndex);
      if (newIndex === 0) {
        pre = newPart;
      }
      if (newIndex === this.content.length - 1) {
        next = newPart;
      }
      this.content.forEach((data, index) => {
        if (newIndex - 1 === index) {
          return (pre = data.part);
        }
        if (newIndex + 1 === index) {
          return (next = data.part);
        }
      });
      return { pre, next };
    }
  }
  test() {
    console.log('asdasdasd');
  }
  checkDataChanged(obj) {
    if (this.ID) {
      if (this.ID !== obj.ID) {
        return true;
      }
    }
    if (this.LID) {
      if (this.LID !== obj.setLID) {
        return true;
      }
    }
    if (this.AuthorID) {
      if (this.AuthorID !== obj.AuthorID) {
        return true;
      }
    }
    if (this.volume) {
      if (this.volume !== obj.volume) {
        return true;
      }
    }
    if (this.chapter) {
      if (this.chapter !== obj.chapter) {
        return true;
      }
    }
    if (this.file) {
      return true;
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
    if (this.views) {
      if (this.views !== obj.views) {
        return true;
      }
    }
    if (this.comment) {
      if (this.comment !== obj.comment) {
        return true;
      }
    }
    return false;
  }
  checkValid() {
    if (this.AuthorID) return true;
    if (this.LID) return true;
    if (this.volume) return true;
    if (this.chapter) return true;
    if (this.file) return true;
    if (this.name) return true;
    if (this.image) return true;
    if (this.views) return true;
    if (this.comment) return true;
    return false;
  }
  change(field, val) {
    switch (field) {
      case 'AuthorID':
        this.setAuthorID(val);
        break;
      case 'LID':
        this.setLID(val);
        break;
      case 'volume':
        this.setVolume(val);
        break;
      case 'chapter':
        this.setChapter(val);
        break;
      case 'content':
        this.setContent(val);
        break;
      case 'name':
        this.setName(val);
        break;
      case 'file':
        this.setFile(val);
        break;
      case 'image':
        this.setImage(val);
        break;
      case 'views':
        this.setViews(val);
        break;
      case 'comment':
        this.setComment(val);
        break;
      default:
        break;
    }
  }
  findByName(value) {
    const newValue = value ? value.toString() : '';
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
  findByAuthorID(arr) {
    const index = arr.findIndex((data) => {
      return data.ID === this.AuthorID;
    });
    return arr[index];
  }
  findByID(arr) {
    const index = arr.findIndex((data) => {
      return data.ID === this.ID;
    });
    return arr[index];
  }
  find(value) {
    const newValue = value ? value.toString() : '';
    if (newValue.length > 0) {
      if (
        convertString(this.AuthorID).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.volume).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.chapter).indexOf(convertString(newValue)) >= 0 ||
        convertString(this.AuthorID) === convertString(newValue) ||
        convertString(this.volume) === convertString(newValue) ||
        convertString(this.chapter) === convertString(newValue)
      ) {
        return true;
      } else return false;
    }
    return false;
  }
  create() {
    let formData = new FormData();
    let formFile = new FormData();
    let upFile = false;
    let upImg = false;
    if (this.file) {
      formFile.append('file', this.file);
      delete this.file;
      upFile = true;
    }
    if (this.image) {
      formData.append('image', this.image.raw);
      delete this.image;
      upImg = true;
    }
    request
      .post('lightnovel/create', this)
      .then(() => {
        this.set(new LightNovel());
        return console.log('Add success!');
      })
      .catch(() => {
        return console.log('Add failed!');
      });
    if (upFile) {
      request
        .post('lightnovel/uploadFile/' + this.ID, formFile, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          return console.log(res.data);
        })
        .catch((err) => console.log('Error : ', err));
    }
    if (upImg) {
      request
        .post('lightnovel/upload/' + this.ID, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          return console.log(res.data);
        })
        .catch((err) => console.log('Error : ', err));
    }
  }
  update(cmt) {
    try {
      let formData = new FormData();
      let formFile = new FormData();
      if (!cmt) {
        if (this.file) {
          formFile.append('file', this.file);
          delete this.file;
          request
            .post('lightnovel/uploadFile/' + this.ID, formFile, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => console.log('Error : ', err));
        }
        if (this.image) {
          console.log('Overlord Vol 1 - chương 1');
          formData.append('image', this.image.raw);
          delete this.image;
          request
            .post('lightnovel/update/' + this.ID, this)
            .then(() => {
              return console.log('Update success!');
            })
            .catch(() => {
              return console.log('Update failed!');
            });
          request
            .post('lightnovel/upload/' + this.ID, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => console.log('Error : ', err));
        } else {
          console.log('Overlord Vol 1 - chương 1');
          request
            .post('lightnovel/update/' + this.ID, this)
            .then(() => {
              return console.log('Update success!');
            })
            .catch(() => {
              return console.log('Update failed!');
            });
        }
      } else {
        delete this.image;
        request
          .post('lightnovel/update/' + this.ID, this)
          .then(() => {
            return console.log('Update success!');
          })
          .catch(() => {
            return console.log('Update failed!');
          });
      }
      return true;
    } catch (e) {
      return false;
    }
  }
  destroy() {
    request
      .delete('lightnovel/delete/' + this.ID)
      .then(() => {
        return console.log('Delete success!');
      })
      .catch(() => {
        return console.log('Delete failed!');
      });
  }
  clear() {
    request
      .delete('lightnovel/clear/' + this.ID)
      .then(() => {
        return console.log('Clear success!');
      })
      .catch(() => {
        return console.log('Clear failed!');
      });
  }
}
export default LightNovel;
