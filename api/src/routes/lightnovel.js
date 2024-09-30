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
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/files');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
});
const upload = multer({ storage: storage });
const fileUpload = multer({ storage: fileStorage });

const lightNovelController = require('../controllers/LightNovelController');

router.get('/', lightNovelController.index);
router.get('/read/:name', lightNovelController.read);
// router.get('/test', lightNovelController.test);
router.get('/getLastRecord', lightNovelController.getLastRecord);
router.get('/getOne/:id', lightNovelController.getOne);
router.get('/getLightNovel/:lid', lightNovelController.getLightNovel);
router.post('/sort', lightNovelController.getSort);
// router.post('/getAll', lightNovelController.getSort);
router.post('/create', lightNovelController.create);
router.post('/update/:id', lightNovelController.update);
router.delete('/delete/:id', lightNovelController.destroy);
router.post('/clean/:id', lightNovelController.clean);
router.post('/upload/:id', upload.single('image'), lightNovelController.upload);
router.post(
  '/uploadFile/:id',
  fileUpload.single('file'),
  lightNovelController.uploadFile
);

// router.get('/', productController.index);

module.exports = router;
