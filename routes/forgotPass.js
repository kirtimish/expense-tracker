const express = require('express');
const router = express.Router();
const forgotPassControlls = require('../controlers/forgotPass');

router.post('/forgotPassword', forgotPassControlls.forgotPassword);

module.exports = router;