const express = require('express');
const router = express.Router();
const expenseControls = require('../controlers/expenseControlls');

router.post('/insert-expense',expenseControls.createExpense);
router.get('/get-expenses',expenseControls.getExpenses);

router.post('/delete-expense/:expenseId',expenseControls.deleteExpense);

module.exports = router;