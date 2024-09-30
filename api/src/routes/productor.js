const express = require('express');
const router = express.Router();

const productorController = require('../controllers/ProductorController');

router.get('/', productorController.index);
router.get('/getLastRecord', productorController.getLastRecord);
router.get('/getOne/:id', productorController.getOne);
router.post('/sort', productorController.getSort);
router.post('/create/:id', productorController.create);
router.post('/update/:id', productorController.update);
router.post('/delete/:id', productorController.destroy);
router.post('/clean/:id', productorController.clean);


module.exports = router;
