const User = require('../models/User');
const Useraccount = require('../models/Account');
// const date = require('date-and-time');

class UserController {
  // GET data from mongoose db :
  index(req, res, next) {
    // console.log('asdasd : ', req.params.id);
    // console.log('qr : ', req.query);
    User.find({ deleted: false })
      .sort({ firstName: -1 })
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data');
        res.json(datas);
      })
      .catch(next);
  }
  // getByAID(req, res, next) {
  //   User.findOne({ AID: req.params.aid })
  //     // .sort({ Name: 1 })
  //     .then((data) => {
  //       console.log('get data logged');
  //       // data=data.password=>
  //       res.json(data.toObject());
  //     })
  //     .catch(() => res.json({}));
  // }
  getDeleted(req, res, next) {
    // console.log('asdasd : ', req.params.id);
    // console.log('qr : ', req.query);
    User.find({ deleted: true })
      .sort({ firstName: -1 })
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data');
        res.json(datas);
      })
      .catch(next);
  }
  getSort(req, res, next) {
    User.find({ deleted: false })
      .sort(req.body)
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data');
        res.json(datas);
      })
      .catch(next);
  }
  getLastUser(req, res, next) {
    User.find()
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

  getOne(req, res, next) {
    User.findOne({ ID: req.params.id })
      // .sort({ Name: 1 })
      .then((data) => {
        console.log('get data logged');
        // data=data.password=>
        res.json(data.toObject());
      })
      .catch(() => res.json({}));
  }
  create(req, res, next) {
    const newUser = new User(req.body);
    User.create(newUser)
      .then((data) => {
        console.log('Add success');
        console.log(data);
        res.send('success');
      })
      .catch(() => res.send('create failed'));
  }

  // POST update a record from db
  update(req, res, next) {
    // console.log(req.body);
    User.updateOne({ ID: req.params.id }, req.body)
      .then(() => {
        console.log('updated');
        console.log(req.body);
        res.send('success');
      })
      .catch(next);
  }
  //POST upload img :
  upload(req, res, next) {
    const uploadImg = { image: req.file.filename };
    console.log(req.file);
    User.updateOne({ ID: req.params.id }, uploadImg)
      .then(() => {
        console.log('image updated');
        res.send('success');
      })
      .catch(next);
  }
  // POST delete a record from db
  accountDestroy(req, res, next) {
    Useraccount.updateOne(
      { ID: req.params.id },
      { deletedAt: new Date(), deleted: true }
    )
      .then(() => {
        console.log('deleted');
        res.send('success');
      })
      .catch(next);
  }
  destroy(req, res, next) {
    // const newwwwwwwwwww = {
    //   Name: 'Nguyễn Thị D',
    // };
    // res.json(req);
    // // console.log(req);
    // const newDate = new Date();
    // console.log(date.format(bbbbbbbbb, 'hh:mm:ss DD/MM/YY'));
    console.log(req.params.id);
    User.updateOne(
      { ID: req.params.id },
      { deletedAt: new Date(), deleted: true }
    )
      .then(() => {
        console.log('deleted');
        res.send('success');
      })
      .catch(next);
    // User.deleteOne({ ID: req.params.id })
    //   .then(() => console.log('deleted'))
    //   .catch(next);
  }
  clear(req, res, next) {
    User.deleteOne({ ID: req.params.id })
      .then(() => {
        console.log('deleted');
        res.send('success');
      })
      .catch(next);
  }
  test(req, res, next) {
    const bbbb = {
      ID: '001',
      name: 'Nguyễn Văn A',
      dateOfBirth: '1999-01-05T17:00:00.000Z',
      sex: 'male',
      address: 'hadddd noi',
      phone: '0123456789',
      civilID: '001004015032',
      salary: '6000000',
      shift: '1',
      // image: '1716305038839.jpeg',
    };
    // const cccc = {
    //   AID: '001',
    //   username: 'admin',
    //   password: '123123',
    //   level: '1',
    // };
    const newUser = new User(bbbb);
    User.create(newUser)
      .then((data) => {
        console.log('Add success');
        res.json(data);
      })
      .catch((err) => console.log('err :', err));
    // Useraccount.create(cccc)
    //   .then((data) => {
    //     console.log('Add account success');
    //     console.log(data);
    //     res.json(data);
    //   })
    //   .catch(next);
  }
}

module.exports = new UserController();
