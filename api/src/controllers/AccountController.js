const Account = require('../models/Account');
// const emailjs = require('@emailjs/nodejs');

// const date = require('date-and-time');

class AccountController {
  // GET data from mongoose db :
  index(req, res, next) {
    // console.log('asdasd : ', req.params.id);
    // console.log('qr : ', req.query);
    // User.find({ DeletedAt: null })
    //   // .sort({ Name: 1 })
    //   .then((datas) => {
    //     datas = datas.map((data) => data.toObject());
    //     console.log('get data');
    //     res.json(datas);
    //   })
    //   .catch(next);
  }
  test(req, res, next) {
    const b = {
      sv: 'service_datn',
      tmp: 'template_5d60l49',

      from_name: 'nam',
      to_name: 'nn',
      message: '1024',
      to_email: 'nguyenquangnam03@gmail.com',

      publicKey: '9TOaGAwMIcgwOFQye',
      privateKey: 'b4HXVIfLbann1telTeSzF', // optional, highly recommended for security reasons
    };
    res.send('');
  }
  getOne(req, res, next) {
    Account.findOne(req.body)
      .then((data) => {
        console.log(data);
        console.log('find account', data);
        res.json(data);
      })
      .catch(next);
  }
  account(req, res, next) {
    Account.findOne(req.body)
      .then((data) => {
        console.log('find account', data, req.body);
        res.json(data);
      })
      .catch(next);
  }
  update(req, res, next) {
    console.log(req.body);
    Account.updateOne({ AID: req.params.id }, req.body)
      .then(() => {
        console.log('updated account');
        res.send('success');
      })
      .catch(next);
  }
  create(req, res, next) {
    const newAccount = new Account(req.body);
    Account.create(newAccount)
      .then((data) => {
        console.log('Add account success');
        console.log(data);
        res.send('success');
      })
      .catch(next);
  }
  // POST delete a record from db
  destroy(req, res, next) {
    Account.updateOne(
      { ID: req.params.id },
      { deletedAt: new Date(), deleted: true }
    )
      .then(() => {
        console.log('deleted');
        res.send('success');
      })
      .catch(next);
  }
}

module.exports = new AccountController();
