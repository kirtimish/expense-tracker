const express = require('express');
const router = express.Router();
const userControls = require('../controlers/userControls')

router.post('/signup',userControls.postUser);
router.post('/login',userControls.postuserLogin)

module.exports = router;