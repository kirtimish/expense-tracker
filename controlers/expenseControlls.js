const Expense = require('../models/expense');
const path = require('path');
const rootDir = require('../util/path');

exports.createExpense = async (req,res,next) => {
    const { expenseAmt, description, category } = req.body;
        try {
            if(expenseAmt == '' || description == '' || category == ''){
                res.json({ error: 'Please fill details'});
            }
    
            const expense = await Expense.create({
               expenseAmt,
               description,
               category,
               userId: req.user.id
            });
            res.status(200).json({expenseCreated: expense});
            // res.json({expenseCreated: expense});
            
        } catch (error) { console.log(error) }
    }


exports.getExpenses = async (req,res,next) => {
    try {
        const expenses = await Expense.findAll({where: {userId: req.user.id}});
        res.json(expenses);
    } catch (error) {
        console.log(err);
    }
}


exports.deleteExpense = async (req,res,next) => {
    try {
        const expenseId = req.params.expenseId;
        const noOfrecords = await Expense.destroy({where: {id: expenseId,userId: req.user.id}});
        if(noOfrecords == 0){
            res.status(404).json({success: false, msg: 'You cant delete other people expense'})
        }
        // res.redirect('/');
        return res.status(200).json({message:"expense deleted successfully"});
    } catch (error) {
        console.log(error);
    }
}