const Expense = require('../models/expense');

exports.createExpense = async (req,res,next) => {
        try {
            const expenseAmt = req.body.expenseAmt;
            const description = req.body.description;
            const category = req.body.category;

            if(expenseAmt == '' || description == '' || category == ''){
                res.json({ error: 'Please fill details'});
            }
    
            const expense = await Expense.create({
               expenseAmt: expenseAmt,
               description: description,
               category: category
            });
            // res.redirect('/');
            res.json({expenseCreated: expense});
            
        } catch (error) { console.log(error) }
    }


exports.getExpenses = async (req,res,next) => {
    try {
        const expenses = await Expense.findAll();
        res.json(expenses);
    } catch (error) {
        console.log(err);
    }
}


exports.deleteExpense = async (req,res,next) => {
    try {
        const expenseId = req.params.expenseId;
        await Expense.destroy({where: {id: expenseId}});
        // res.redirect('/');
        res.json({message:"expense deleted successfully"});
    } catch (error) {
        console.log(error);
    }
}