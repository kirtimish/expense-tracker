const express = require('express');
const router = express.Router();
const userControls = require('../controlers/userControls')

router.post('/user/signup',userControls.postUser);
router.get('/user/login', userControls.getLogin);
router.post('/user/login',userControls.postuserLogin)

module.exports = router;