const express = require('express');
const router = express.Router();
const expenseControls = require('../controlers/expenseControlls');

router.get('/insert-expense', expenseControls.getExpensePage);
router.post('/insert-expense',expenseControls.createExpense);
router.get('/get-expenses',expenseControls.getExpenses);

router.post('/delete-expense/:expenseId',expenseControls.deleteExpense);

module.exports = router;