import request from '~/utils/request';

const setArrayComment = (array) => {
  if (Array.isArray(array)) {
    const newArray = array.map((item) => new Comment(item));
    return newArray;
  } else if (array) return [new Comment(array)];
  return [];
};

class Comment {
  constructor(obj) {
    if (obj) {
      this.UID = obj.UID;
      this.LID = obj.LID;
      this.username = obj.username;
      this.content = obj.content;
      this.image = obj.image;
      this.chapter = obj.chapter;
      if (obj._id) this._id = obj._id;
      this.liked = obj.liked;
      this.disliked = obj.disliked;
      this.child = setArrayComment(obj.child);
      this.replyName = obj.replyName;
      this.createdAt = obj.createdAt;
      if (obj.deletedAt) this.deletedAt = obj.deletedAt;
    }
  }
  set(obj) {
    if (obj) {
      if (this.UID) this.UID = obj.UID;
      if (this.LID) this.LID = obj.LID;
      if (this.username) this.username = obj.username;
      if (this.content) this.content = obj.content;
      if (this.image) this.image = obj.image;
      if (this.chapter) this.chapter = obj.chapter;
      if (obj._id) this._id = obj._id;
      if (this.liked) this.liked = obj.liked;
      if (this.disliked) this.disliked = obj.disliked;
      if (this.child) this.child = obj.child;
      if (this.createdAt) this.createdAt = obj.createdAt;
      if (obj.deletedAt) this.deletedAt = obj.deletedAt;
    }
  }
  setImage(val) {
    return (this.image = val);
  }
  addChild(obj) {
    const newComment = new Comment(obj);
    if (Array.isArray(this.child)) {
      return this.child.push(newComment);
    } else return (this.child = [newComment]);
  }
  like(uid) {
    // console.log(this.liked);
    if (Array.isArray(this.disliked)) {
      const index = this.disliked.findIndex((item) => {
        if (item.UID === uid) {
          return true;
        }
        return false;
      });
      this.disliked.splice(index, 1);
    }
    if (Array.isArray(this.liked)) {
      const index = this.liked.findIndex((item) => {
        if (item.uid === uid) {
          return true;
        }
        return false;
      });
      if (index >= 0) return this.liked.splice(index, 1);
      else return this.liked.push({ uid: uid });
    } else {
      this.liked = [{ uid: uid }];
      console.log(this.liked);
    }
  }
  dislike(uid) {
    if (Array.isArray(this.liked)) {
      const index = this.liked.findIndex((item) => {
        if (item.uid === uid) {
          return true;
        }
        return false;
      });
      this.liked.splice(index, 1);
    }
    if (Array.isArray(this.disliked)) {
      const index = this.disliked.findIndex((item) => {
        if (item.uid === uid) {
          return true;
        }
        return false;
      });
      if (index >= 0) return this.disliked.splice(index, 1);
      else return this.disliked.push({ uid: uid });
    } else this.disliked = [{ uid: uid }];
  }
  delete() {
    this.deletedAt = new Date();
  }

  create() {
    try {
      request
        .post('comment/create', this)
        .then(() => {
          this.set(new Comment());
          return console.log('Add success!');
        })
        .catch(() => {
          return console.log('Add failed!');
        });
      return true;
    } catch (e) {
      return false;
    }
  }

  update() {
    // const newID = this._id;
    // delete this._id;
    try {
      request
        .post('comment/update/' + this._id, this)
        .then(() => {
          return console.log('Update success!');
        })
        .catch(() => {
          return console.log('Update failed!');
        });
      return true;
    } catch (e) {
      return false;
    }
  }

  destroy() {
    request
      .delete('comment/delete/' + this._id)
      .then(() => {
        return console.log('Delete success!');
      })
      .catch(() => {
        return console.log('Delete failed!');
      });
  }
}
export default Comment;
