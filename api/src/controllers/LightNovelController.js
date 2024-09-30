const fs = require('node:fs');

const LightNovel = require('../models/LightNovel');
// const date = require('date-and-time');

class LightNovelController {
  // GET data from mongoose db :
  index(req, res, next) {
    // console.log('asdasd : ', req.params.id);
    // console.log('qr : ', req.query);
    LightNovel.find({ deletedAt: null })
      .sort({ createdAt: -1 })
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data : LightNovel');
        res.json(datas);
      })
      .catch(next);
  }
  read(req, res, next) {
    // const newDir = this.dir ? this.dir : DIR_PUBLIC;
    // where = where ? checkCondition(where) : '';
    const newDir = 'public/files';
    var filename = newDir + '/' + req.params.name;
    const hashText = (text, sperator) => {
      if (typeof text === 'string') {
        return text.split(sperator);
      }
    };
    const hashFile = (text) => {
      if (typeof text === 'string') {
        const newStr = hashText(text, '\n');
        const req = newStr.map((str) => hashText(str, '\r'));
        // const req = text.split('\n');
        return req;
      }
      return text;
    };
    try {
      const lightnovel = fs.readFileSync(filename, 'utf8');
      console.log('Get lightnovel : get text');
      res.json(hashFile(lightnovel));
    } catch (err) {
      console.log(err);
      res.json('Error');
    }
  }
  getLastRecord(req, res, next) {
    LightNovel.find()
      .sort({ ID: -1 })
      .then((datas) => {
        datas.map((data, index) => {
          if (index === 0) return res.json(data);
          else return 1;
        });
        res.send('get last LightNovel');
      })
      .catch(next);
  }
  getLightNovel(req, res, next) {
    LightNovel.find({ deletedAt: null, LID: req.params.lid })
      .sort({ createdAt: -1, chapter: 1 })
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('Get lightnovel : Details');
        res.json(datas);
      })
      .catch(next);
  }
  getSort(req, res, next) {
    LightNovel.find({ deletedAt: null })
      .sort(req.body)
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data');
        res.json(datas);
      })
      .catch(next);
  }
  getDeleted(req, res, next) {
    LightNovel.find({ deleted: true })
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data');
        res.json(datas);
      })
      .catch(next);
  }

  getOne(req, res, next) {
    LightNovel.findOne({ LID: req.params.id })
      .then((data) => {
        console.log(data);
        console.log('find LightNovel');
        res.json(data);
      })
      .catch(next);
  }

  update(req, res, next) {
    LightNovel.updateOne({ ID: req.params.id }, req.body)
      .then(() => {
        console.log('Updated : LightNovel');
        res.send('success');
      })
      .catch(next);
  }

  //POST upload img :
  upload(req, res, next) {
    const uploadImg = { image: req.file.filename };
    console.log(req.file);
    LightNovel.updateOne({ ID: req.params.id }, uploadImg)
      .then(() => {
        console.log('image upload');
        res.send('success');
      })
      .catch(next);
  }
  //post upload file :
  uploadFile(req, res, next) {
    const uploadFile = { file: req.file.filename };
    console.log(req.file);
    LightNovel.updateOne({ ID: req.params.id }, uploadFile)
      .then(() => {
        console.log('file upload');
        res.send('success');
      })
      .catch(next);
  }
  create(req, res, next) {
    const newLightNovel = new LightNovel(req.body);
    LightNovel.create(newLightNovel)
      .then((data) => {
        console.log('Add LightNovel success');
        console.log(data);
        res.send('success');
      })
      .catch(next);
  }
  // POST delete a record from db
  destroy(req, res, next) {
    console.log('delete ', req.params.id);
    LightNovel.updateOne(
      { ID: req.params.id },
      { deletedAt: new Date(), deleted: true }
    )
      .then(() => {
        console.log('deleted');
        res.send('success');
      })
      .catch(next);
  }
  clean(req, res, next) {
    LightNovel.deleteOne(req.params.id)
      .then(() => {
        console.log('clean ' + req.params.id);
        res.send('clean ' + req.params.id);
      })
      .catch(next);
  }
}

module.exports = new LightNovelController();
