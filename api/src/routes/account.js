const express = require('express');
const router = express.Router();

const accountController = require('../controllers/AccountController');

// router.get('/', accountController.index);

router.post('/login', accountController.account);
router.post('/get', accountController.account);
router.post('/update/:id', accountController.update);
router.post('/create/', accountController.create);
router.post('/delete/:id', accountController.destroy);

router.get('/test', accountController.test);
// router.get('/', accountController.index);

module.exports = router;
