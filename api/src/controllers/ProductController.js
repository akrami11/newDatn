const Product = require('../models/Product');
// const date = require('date-and-time');

class ProductController {
  // GET data from mongoose db :
  index(req, res, next) {
    // console.log('asdasd : ', req.params.id);
    // console.log('qr : ', req.query);
    Product.find({ DeletedAt: null, hide: 0 })
      .sort({ createdAt: 1 })
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data');
        res.json(datas);
      })
      .catch(next);
  }
  getNew(req, res, next) {
    // console.log('asdasd : ', req.params.id);
    // console.log('qr : ', req.query);
    Product.find({ hide: 1 })
      .sort({ createdAt: 1 })
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data', datas);
        res.json(datas);
      })
      .catch(next);
  }
  getTopView(req, res, next) {
    Product.find({ DeletedAt: null })
      .sort({ views: -1 })
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data by views');
        res.json(datas);
      })
      .catch(next);
  }
  getLastRecord(req, res, next) {
    Product.find()
      .sort({ ID: -1 })
      .then((datas) => {
        if (datas.length > 0) {
          datas.map((data, index) => {
            if (index === 0) return res.json(data);
            else return 1;
          });
        }
        console.log('get last user');
        return res.json({ ID: '0' });
      })
      .catch(next);
  }
  getSort(req, res, next) {
    Product.find({ deletedAt: null })
      .sort(req.body)
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data');
        res.json(datas);
      })
      .catch(next);
  }
  getDeleted(req, res, next) {
    Product.find({ deleted: true })
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data');
        res.json(datas);
      })
      .catch(next);
  }

  getOne(req, res, next) {
    Product.findOne({ ID: req.params.id })
      .then((data) => {
        console.log(data);
        console.log('find Product');
        res.json(data);
      })
      .catch(next);
  }

  update(req, res, next) {
    Product.updateOne({ ID: req.params.id }, req.body)
      .then(() => {
        console.log('updated Product');
        res.send('success');
      })
      .catch(next);
  }

  //POST upload img :
  upload(req, res, next) {
    const uploadImg = { image: req.file.filename };
    console.log(req.file);
    Product.updateOne({ ID: req.params.id }, uploadImg)
      .then(() => {
        console.log('image updated');
        res.send('success');
      })
      .catch(next);
  }
  create(req, res, next) {
    const newProduct = new Product(req.body);
    console.log(newProduct);
    Product.create(newProduct)
      .then((data) => {
        console.log('Add Product success');
        console.log(data);
        res.send('success');
      })
      .catch(next);
  }
  // POST delete a record from db
  destroy(req, res, next) {
    Product.updateOne(
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
    Product.deleteOne(req.params.id)
      .then(() => {
        console.log('clean ' + req.params.id);
        res.send('clean ' + req.params.id);
      })
      .catch(next);
  }
}

module.exports = new ProductController();
