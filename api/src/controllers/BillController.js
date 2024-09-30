const Bill = require('../models/Bill');
// const date = require('date-and-time');

class BillController {
  // GET data from mongoose db :
  index(req, res, next) {
    // console.log('asdasd : ', req.params.id);
    // console.log('qr : ', req.query);
    Bill.find({ DeletedAt: null })
      // .sort({ Name: 1 })
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data');
        res.json(datas);
      })
      .catch(next);
  }
  test(req, res, next) {
    const newb = {
      UID: '001',
      CID: '001',
      Items: [
        {
          PID: '001',
          Quantity: 3,
          Price: '60000',
        },
        {
          PID: '002',
          Quantity: 3,
          Price: '60000',
        },
      ],
      ConfirmDate: null,
      DeliveryDate: null,
      Total: 360000,
    };

    const newAccount = new Bill(newb);
    console.log(req.body);
    Bill.create(newAccount)
      .then((data) => {
        console.log('Add success');
        console.log(data);
        res.json(data);
      })
      .catch((err) => console.log('err :', err));
  }
  getSort(req, res, next) {
    Bill.find({ deletedAt: null })
      .sort(req.body)
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data');
        res.json(datas);
      })
      .catch(next);
  }
  getDeleted(req, res, next) {
    Bill.find({ deleted: true })
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data');
        res.json(datas);
      })
      .catch(next);
  }

  getOne(req, res, next) {
    Bill.findOne(req.body)
      .then((data) => {
        console.log(data);
        console.log('find Bill');
        res.json(data);
      })
      .catch(next);
  }

  update(req, res, next) {
    Bill.updateOne({ ID: req.params.id }, req.body)
      .then(() => {
        console.log('updated Bill');
        res.send('success');
      })
      .catch(next);
  }
  create(req, res, next) {
    const newBill = new Bill(req.body);
    Bill.create(newBill)
      .then((data) => {
        console.log('Add Bill success');
        console.log(data);
        res.send('success');
      })
      .catch(next);
  }
  // POST delete a record from db
  destroy(req, res, next) {
    Bill.updateOne(
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
    Bill.deleteOne(req.params.id)
      .then(() => {
        console.log('clean ' + req.params.id);
        res.send('clean ' + req.params.id);
      })
      .catch(next);
  }
}

module.exports = new BillController();
