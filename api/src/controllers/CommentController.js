const Comment = require('../models/Comment');
// const date = require('date-and-time');

class CommentController {
  // GET data from mongoose db :
  index(req, res, next) {
    // console.log('asdasd : ', req.params.id);
    // console.log('qr : ', req.query);
    Comment.find({ deletedAt: null, LID: req.params.LID })
      .sort({ createdAt: -1 })
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('Get data : Comment');
        res.json(datas);
      })
      .catch(next);
  }
  getCommentChapter(req, res, next) {
    // console.log('LID : ', req.params.LID, 'chapter', req.params.chapter);
    // console.log('asdasd : ', req.params.id);
    // console.log('qr : ', req.query);
    Comment.find({
      deletedAt: null,
      LID: req.params.LID,
      chapter: req.params.chapter,
    })
      .sort({ createdAt: -1 })
      .then((datas) => {
        datas = datas.map((data) => data.toObject());
        console.log('Get data : Comment');
        res.json(datas);
      })
      .catch(next);
    // res.json([{ abc: 1 }]);
  }
  update(req, res, next) {
    Comment.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        console.log('Updated : Comment');
        res.send('success');
      })
      .catch(next);
  }

  create(req, res, next) {
    const newComment = new Comment(req.body);
    Comment.create(newComment)
      .then((data) => {
        console.log('Add success : Comment');
        console.log(data);
        res.send('success');
      })
      .catch(next);
  }
  // POST delete a record from db
  destroy(req, res, next) {
    console.log('delete ', req.params.id);
    Comment.updateOne(
      { _id: req.params.id },
      { deletedAt: new Date(), deleted: true }
    )
      .then(() => {
        console.log('deleted');
        res.send('success');
      })
      .catch(next);
  }
  clean(req, res, next) {
    Comment.deleteOne(req.params.id)
      .then(() => {
        console.log('clean ' + req.params.id);
        res.send('clean ' + req.params.id);
      })
      .catch(next);
  }
}

module.exports = new CommentController();
