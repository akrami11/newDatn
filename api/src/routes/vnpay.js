const express = require('express');
const router = express.Router();
const vnpayController = require('../controllers/VNPayController');

router.post('/create_payment_url', vnpayController.index);

router.get('/vnpay_return', vnpayController.return);

router.get('/vnpay_ipn', vnpayController.input);

// router.post('/querydr', vnpayController.queryDr);

// router.post('/refund', vnpayController.refund);

module.exports = router;
