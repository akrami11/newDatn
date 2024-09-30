const Productor = require('../models/Productor');
// const date = require('date-and-time');

class ProductorController {
  // GET data from mongoose db :
  index(req, res, next) {
    // console.log('asdasd : ', req.params.id);
    // console.log('qr : ', req.query);
    Productor.find({ DeletedAt: null })
      // .sort({ Name: 1 })
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data');
        res.json(datas);
      })
      .catch(next);
  }
  getLastRecord(req, res, next) {
    Productor.find()
      .sort({ ID: -1 })
      .then((datas) => {
        datas.map((data, index) => {
          if (index === 0) return res.json(data);
          else return 1;
        });
        res.send('get last user');
      })
      .catch(next);
  }
  getSort(req, res, next) {
    Productor.find({ deletedAt: null })
      .sort(req.body)
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data');
        res.json(datas);
      })
      .catch(next);
  }
  getDeleted(req, res, next) {
    Productor.find({ deleted: true })
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data');
        res.json(datas);
      })
      .catch(next);
  }

  getOne(req, res, next) {
    Productor.findOne(req.body)
      .then((data) => {
        console.log(data);
        console.log('find Productor');
        res.json(data);
      })
      .catch(next);
  }

  update(req, res, next) {
    Productor.updateOne({ ID: req.params.id }, req.body)
      .then(() => {
        console.log('updated Productor');
        res.send('success');
      })
      .catch(next);
  }

  //POST upload img :
  upload(req, res, next) {
    const uploadImg = { image: req.file.filename };
    console.log(req.file);
    Productor.updateOne({ ID: req.params.id }, uploadImg)
      .then(() => {
        console.log('image updated');
        res.send('success');
      })
      .catch(next);
  }
  create(req, res, next) {
    const newProductor = new Productor(req.body);
    Productor.create(newProductor)
      .then((data) => {
        console.log('Add Productor success');
        console.log(data);
        res.send('success');
      })
      .catch(next);
  }
  // POST delete a record from db
  destroy(req, res, next) {
    Productor.updateOne(
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
    Productor.deleteOne(req.params.id)
      .then(() => {
        console.log('clean ' + req.params.id);
        res.send('clean ' + req.params.id);
      })
      .catch(next);
  }
}

module.exports = new ProductorController();
