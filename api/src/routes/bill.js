const express = require('express');
const router = express.Router();

const billController = require('../controllers/BillController');
 
router.get('/', billController.index);
router.get('/test', billController.test);
// router.get('/', billController.index);

module.exports = router;
