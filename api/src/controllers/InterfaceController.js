const Interface = require('../models/Interface');
// const date = require('date-and-time');

class UserController {
  // GET data from mongoose db :
  index(req, res, next) {
    Interface.find({ deletedAt: null })
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data interface');
        res.json(datas);
      })
      .catch(next);
  }
  sidebar(req, res, next) {
    Interface.find({ type: 'Sidebar', deletedAt: null })
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('get data interface');
        res.json(datas);
      })
      .catch(next);
  }
  test(req, res, next) {
    const newInterface = new Interface(req.body);
    console.log(req.body);
    Interface.create(newInterface)
      .then((data) => {
        console.log('Add success');
        console.log(data);
      })
      .catch((err) => console.log('err :', err));
  }

  // POST create new
  create(req, res, next) {
    // const newb = {
    //   ID: '001',
    //   Username: 'admin',
    //   Password: '123123',
    //   Level: '1',
    //   deletedAt: null,
    //   createdAt: '2024-05-21T16:45:54.605Z',
    //   updatedAt: '2024-05-21T16:45:54.605Z',
    // };
    const newInterface = new Interface(req.body);
    console.log(req.body);
    Interface.create(newInterface)
      .then((data) => {
        console.log('Add success');
        console.log(data);
      })
      .catch((err) => console.log('err :', err));
  }
  // POST update a record from db
  update(req, res, next) {
    // console.log(req.body);
    Interface.updateOne({ ID: req.params.id }, req.body)
      .then(() => console.log('updated'))
      .catch(next);
  }
  //POST upload img :
  upload(req, res, next) {
    const uploadImg = { image: req.file.filename };
    console.log(req.file);
    Interface.updateOne({ ID: req.params.id }, uploadImg)
      .then(() => console.log('image updated'))
      .catch(next);
  }
  // POST disable
  destroy(req, res, next) {
    Interface.updateOne({ ID: req.params.id }, { deletedAt: new Date() })
      .then(() => console.log('deleted'))
      .catch(next);
  }
  delete(req, res, next) {
    Interface.deleteOne({ ID: req.params.id })
      .then(() => console.log('deleted'))
      .catch(next);
  }
}

module.exports = new UserController();
