const express = require('express');
const router = express.Router();

const orderController = require('../controllers/OrderController');

router.get('/', orderController.index);
router.get('/test', orderController.test);
// router.get('/', orderController.index);

module.exports = router;
