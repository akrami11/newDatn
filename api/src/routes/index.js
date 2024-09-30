const express = require('express');
const userRouter = require('./user');
const accountRouter = require('./account');
const interfaceRouter = require('./interface');
const customerRouter = require('./customer');
const billRouter = require('./bill');
const orderRouter = require('./order');
const productRouter = require('./product');
const productorRouter = require('./productor');
const lightnovelRouter = require('./lightnovel');
const commentRouter = require('./comment');
const vnpayRouter = require('./vnpay.js');

function route(app) {
  //   app.use('/', userRouter);
  app.use('/', accountRouter);
  app.use('/user', userRouter);
  app.use('/interface', interfaceRouter);
  app.use('/customer', customerRouter);
  app.use('/bill', billRouter);
  app.use('/order', orderRouter);
  app.use('/product', productRouter);
  app.use('/productor', productorRouter);
  app.use('/lightnovel', lightnovelRouter);
  app.use('/comment', commentRouter);
  app.use('/vnpay', vnpayRouter);
  app.use('/public', express.static('public/images'));
  app.use('/files', express.static('public/files'));
  // app.use('/public', express.static('/public'));
  //   app.get('/', (req, res) => {
  //     // res.json(req.body);
  //     // console.log(req.body);
  //     // console.log(req.data);
  //     // return res.send('Hello World!');
  //     res.render('home');
  //   });
  //   app.get('/search', (req, res) => {
  //     const PRE_DATABASE = [
  //       {
  //         ID: '0001',
  //         Name: 'Nguyễn Văn A',
  //         DateOfBirth: '1/6/1999',
  //         Sex: 'male',
  //         Address: 'hbt, ha noi',
  //         Phone: '0123456789',
  //         CivilID: '001004015032',
  //         Luong: 6000000,
  //         WorkShift: 1,
  //       },
  //       {
  //         ID: '0002',
  //         Name: 'Nguyễn Văn B',
  //         DateOfBirth: '10/4/2003',
  //         Sex: 'male',
  //         Address: 'hbt, ha noi',
  //         Phone: '0123456789',
  //         CivilID: '001004015032',
  //         Luong: 6000000,
  //         WorkShift: 1,
  //       },
  //       {
  //         ID: '0003',
  //         Name: 'Nguyễn Thị C',
  //         DateOfBirth: '7/7/2002',
  //         Sex: 'famale',
  //         Address: 'ha noi',
  //         Phone: '0123456789',
  //         CivilID: '001004015032',
  //         Luong: 6000000,
  //         WorkShift: 1,
  //       },
  //     ];
  //     return res.json(PRE_DATABASE);
  //   });
}

module.exports = route;
