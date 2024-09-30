import request from '~/utils/request';

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

class Interface {
  // constructor(ID) {
  //   this.ID = ID;
  // }
  constructor(obj) {
    if (obj) {
      if (obj.ID) {
        this.ID = obj.ID;
      }
      if (obj.name) {
        this.name = obj.name;
      }
      if (obj.title) {
        this.title = obj.title;
      }
      if (obj.to) {
        this.to = obj.to;
      }
      if (obj.image) {
        this.image = obj.image;
      }
      if (obj.children) {
        this.children = obj.children;
      }
      if (obj.type) {
        this.type = obj.type;
      }
      if (obj.icon) {
        this.icon = obj.icon;
      }
      if (obj.showTime) {
        this.showTime = getTimeFromDate(obj.showTime);
      }
      if (obj.level) {
        this.level = obj.level;
      }
    }
  }
  set(obj) {
    this.ID = obj.ID;
    this.name = obj.name;
    this.title = obj.title;
    this.to = obj.to;
    this.children = obj.children;
    this.type = obj.type;
    this.icon = obj.icon;
    this.showTime = getTimeFromDate(obj.showTime);
    this.level = obj.level;
  }

  setID(val) {
    return (this.ID = val);
  }
  setName(val) {
    return (this.name = val);
  }
  setTitle(val) {
    return (this.title = val);
  }
  setShowTime(val) {
    return (this.showTime = getTimeFromDate(val));
  }
  setLink(val) {
    return (this.to = val);
  }
  setImage(val) {
    return (this.image = val);
  }
  setChildren(val) {
    return (this.children = val);
  }
  setType(val) {
    return (this.type = val);
  }
  setIcon(val) {
    return (this.icon = val);
  }
  setLevel(val) {
    return (this.level = val);
  }
  setDatas(val) {
    return (this.data = val);
  }
  checkDataChanged(obj) {
    if (this.name) {
      if (this.name !== obj.name) {
        return true;
      }
    }
    if (this.title) {
      if (this.title !== obj.title) {
        return true;
      }
    }
    if (this.to) {
      if (this.to !== obj.to) {
        return true;
      }
    }
    if (this.children) {
      if (this.children !== obj.children) {
        return true;
      }
    }
    if (this.type) {
      if (this.type !== obj.type) {
        return true;
      }
    }
    if (this.icon) {
      if (this.icon !== obj.icon) {
        return true;
      }
    }
    if (this.showTime) {
      if (this.showTime !== getTimeFromDate(obj.showTime)) {
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
    if (this.name) {
      return true;
    }
    if (this.title) {
      return true;
    }
    if (this.to) {
      return true;
    }
    if (this.children) {
      return true;
    }
    if (this.type) {
      return true;
    }
    if (this.icon) {
      return true;
    }
    if (this.showTime) {
      return true;
    }
    if (this.level) {
      return true;
    }
    return false;
  }
  change(field, val) {
    switch (field) {
      case 'name':
        this.setName(val);
        break;
      case 'title':
        this.setTitle(val);
        break;
      case 'showTime':
        this.setShowTime(val);
        break;
      case 'to':
        this.setLink(val);
        break;
      case 'children':
        this.setChildren(val);
        break;
      case 'type':
        this.setType(val);
        break;
      case 'icon':
        this.setIcon(val);
        break;
      case 'level':
        this.setLevel(val);
        break;
      default:
        break;
    }
  }

  getAll() {
    request
      .get('interface')
      .then((res) => {
        // call back save data
        const req = res.data.map((data) => new Interface(data));

        this.setDatas(req);
      })
      .catch(() => {
        return this.setDatas([]);
      });
    return this;
  }
  create() {
    request
      .post('interface/create', this)
      .then(() => {
        return console.log('Update success');
      })
      .catch(() => {
        return console.log('Add failed');
      });
  }
  update() {
    request
      .post('interface/update/id=' + this.ID, this)
      .then(() => {
        return console.log('Update success');
      })
      .catch(() => {
        return console.log('Update failed');
      });
  }
}
export default Interface;
