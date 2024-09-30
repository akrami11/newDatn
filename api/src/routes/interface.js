// const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const interfaceController = require('../controllers/InterfaceController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/files');
  },
});
const upload = multer({ storage: storage });

router.get('/', interfaceController.index);
router.get('/sidebar', interfaceController.sidebar);
// router.get('/test', interfaceController.test);
router.post('/create', interfaceController.create);
router.post('/upload', upload.single('file'), interfaceController.upload);
router.post('/disable/:id', interfaceController.destroy);
router.post('/delete/:id', interfaceController.delete);
router.post('/update/:id', interfaceController.update);

module.exports = router;
