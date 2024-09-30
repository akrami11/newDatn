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

const customerController = require('../controllers/CustomerController');

// router.get('/', customerController.index);
router.get('/', customerController.index);
router.get('/getOne/:id', customerController.getOne);
router.get('/getLastRecord', customerController.getLastCustomer);

router.get('/view', customerController.index);
router.get('/attendance', customerController.index);
router.get('/workshift', customerController.index);
router.get('/deleted', customerController.getDeleted);
router.post('/get', customerController.index);
router.post('/sort', customerController.getSort);
router.post('/update/:id', customerController.update);
router.post('/create/', customerController.create);
router.post('/delete/:id', customerController.destroy);

router.get('/test', customerController.test);

router.post('/upload/:id', upload.single('image'), customerController.upload);


// router.get('/', customerController.index);

module.exports = router;
