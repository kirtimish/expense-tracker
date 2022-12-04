const express = require('express');
const router = express.Router();
const userControls = require('../controlers/userControls')
const expenseControlls = require('../controlers/expenseControlls')
const userAuthentication = require('../middleware/auth')

router.post('/get-expenses/:pageNo',userAuthentication.authenticate,expenseControlls.getExpenses)
router.post('/signup',userControls.postUser);
router.post('/login',userControls.postuserLogin)

module.exports = router;