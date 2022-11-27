const express = require('express');
const router = express.Router();
const userControls = require('../controlers/userControls')

router.post('/user/signup',userControls.postUser);
router.get('/user/login', userControls.getLogin);

module.exports = router;