const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const lightnovelRouter = require('./lightnovel');
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
const productController = require('../controllers/ProductController');

router.get('/', productController.index);
router.get('/book', productController.index);
router.get('/new', productController.getNew);
router.use('/lightnovel', lightnovelRouter);
// router.get('/test', productController.test);
router.get('/getTopView', productController.getTopView);
// router.get('/getTopView', productController.getTopView);
router.get('/getLastRecord', productController.getLastRecord);
router.get('/getOne/:id', productController.getOne);
router.post('/sort', productController.getSort);
router.post('/create', productController.create);
router.post('/update/:id', productController.update);
router.post('/delete/:id', productController.destroy); 
router.post('/clean/:id', productController.clean);
router.post('/upload/:id', upload.single('image'), productController.upload);

// router.get('/', productController.index);

module.exports = router;
