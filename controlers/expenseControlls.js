const Expense = require('../models/expense');
const path = require('path');
const rootDir = require('../util/path');
const User = require('../models/user');

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

exports.getAllUsers = async(req,res,next)=>{
    try {
        console.log(req.user.ispremiumuser);

        if(req.user.ispremiumuser){
            console.log("into getall Users");
            let leaderboard = [];
            let users = await User.findAll({attributes: ['id', 'username', 'email']})

            console.log(users);

            for(let i = 0 ;i<users.length ; i++){
                let expenses = await  users[i].getExpenses() ;

                console.log(users[i]);
                console.log(expenses);
                let totalExpense = 0;
                for(let j = 0 ;j<expenses.length ; j++){
                    totalExpense += expenses[j].eamount

                }
                console.log(totalExpense);
                let userObj = {
                    user:users[i],
                    expenses,
                    totalExpense
                }
                leaderboard.push(userObj);
            }
           return res.status(200).json({success : true, data : leaderboard});
        }

        return res.status(400).json({message : 'user is not premium user' });

    } catch (error) {
        res.status(500).json({success : false, data : error});
    }
}

exports.getInfoForPremiumUsers = async (req,res,next) => {
    try{
        if(req.user.ispremiumuser){
            const userId = req.params.loadUserId;
            const user = await User.findOne({where:{id: userId}})
    
            const expenses = await user.getExpenses();
            return res.status(200).json({success:true , data: expenses })
        }

    }
    catch(error){
        return res.status(500).json({success : false, data : error});
    }
}


exports.deleteExpense = async (req,res,next) => {
    try {
        const expenseId = req.params.expenseId;
        const noOfRows = await Expense.destroy({where: {id: expenseId, userId: req.user.id}}) //user can only delete his data not others
        if(noOfRows === 0) {
            res.status(404).json({success: false, message: 'You cant delete expesnes of others'});
        }

        return res.status(200).json({message:'user deleted successfully'});
    }catch(err) {console.log(err)};
}
