const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});
const upload = multer({ storage: storage });

const userController = require('../controllers/UserController');

// router.get('/', userController.index);
router.get('/', userController.index);

router.get('/view', userController.index);
router.get('/attendance', userController.index);
router.get('/workshift', userController.index);
router.get('/deleted', userController.getDeleted);
router.post('/sort', userController.getSort);
// router.post('', userController.search);
router.get('/getLastRecord', userController.getLastUser);
router.get('/test', userController.test);
router.get('/getOne/:id', userController.getOne);
// router.get('/account', userController.userDetails);
// router.post('/account/create/', userController.accountCreate);
// router.post('/account/update/:id', userController.accountUpdate);
// router.post('/login', userController.account);
router.post('/create', userController.create);
router.post('/update/:id', userController.update);
router.post('/upload/:id', upload.single('image'), userController.upload);
// router.post('/upload', upload.single('image'), (req, res, next) => {
//   console.log(upload.dest);
// });
// router.post('/upload', upload.single('image'), function (req, res, next) {
//   // req.file is the `avatar` file
//   console.log(req.file);
//   // req.body will hold the text fields, if there were any
// });
router.delete('/delete/:id', userController.destroy);
router.delete('/clear/:id', userController.clear);
router.delete('/account/delete/:id', userController.accountDestroy);

module.exports = router;
