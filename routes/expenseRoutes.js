const express = require('express');
const router = express.Router();
const expenseControls = require('../controlers/expenseControlls');
const userAuthentication = require('../middleware/auth')

router.post('/insert-expense',userAuthentication.authenticate,expenseControls.createExpense);
router.get('/get-expenses',userAuthentication.authenticate,expenseControls.getExpenses);
router.get('/premiums',userAuthentication.authenticate, expenseControls.getAllUsers)
router.get('/download',userAuthentication.authenticate,expenseControls.downloadExpense)
router.get('/getAllUrl',userAuthentication.authenticate,expenseControls.downloadAllUrl)
router.get('/getInfo/:clickedUserId',userAuthentication.authenticate,expenseControls.getInfoForPremiumUsers)
router.post('/delete-expense/:expenseId',userAuthentication.authenticate,expenseControls.deleteExpense);

module.exports = router;