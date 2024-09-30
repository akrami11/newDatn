const Customer = require('../models/Customer');
// const date = require('date-and-time');

class CustomerController {
  // GET data from mongoose db :
  index(req, res, next) {
    // console.log('asdasd : ', req.params.id);
    // console.log('qr : ', req.query);
    Customer.find({ deletedAt: null })
      // .sort({ Name: 1 })
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data');
        res.json(datas);
      })
      .catch(next);
  }
  getSort(req, res, next) {
    Customer.find({ deletedAt: null })
      .sort(req.body)
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data');
        res.json(datas);
      })
      .catch(next);
  }
  getDeleted(req, res, next) {
    Customer.find({ deleted: true })
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data');
        res.json(datas);
      })
      .catch(next);
  }

  test(req, res, next) {
    const newb = {
      ID: '003',
      firstName: 'Nguyen',
      lastName: 'Quang Nam',
      dateOfBirth: new Date('01/06/1999'),
      sex: 'male',
      address: 'ha tay',
      phone: '0395118914',
      email: 'nguyenquangnam03@gmail.com',
      authorName: null,
    };
    const newCustomer = new Customer(newb);
    console.log(req.body);
    Customer.create(newCustomer)
      .then((data) => {
        console.log('Add success');
        console.log(data);
        res.json(data);
      })
      .catch((err) => console.log('err :', err));
  }
  getOne(req, res, next) {
    Customer.findOne({ ID: req.params.id })
      .then((data) => {
        console.log(data);
        console.log('find 1 Customer');
        res.json(data);
      })
      .catch(next);
  }
  getLastCustomer(req, res, next) {
    Customer.find()
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
  update(req, res, next) {
    Customer.updateOne({ ID: req.params.id }, req.body)
      .then(() => {
        console.log('updated Customer');
        res.send('success');
      })
      .catch(next);
  }
  //POST upload img :
  upload(req, res, next) {
    const uploadImg = { image: req.file.filename };
    console.log(req.file);
    Customer.updateOne({ ID: req.params.id }, uploadImg)
      .then(() => {
        console.log('image updated');
        res.send('success');
      })
      .catch(next);
  }
  create(req, res, next) {
    const newCustomer = new Customer(req.body);
    Customer.create(newCustomer)
      .then((data) => {
        console.log('Add Customer success');
        console.log(data);
        res.send('success');
      })
      .catch(next);
  }
  // POST delete a record from db
  destroy(req, res, next) {
    Customer.updateOne(
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
    Customer.deleteOne(req.params.id)
      .then(() => {
        console.log('clean ' + req.params.id);
        res.send('clean ' + req.params.id);
      })
      .catch(next);
  }
}

module.exports = new CustomerController();
