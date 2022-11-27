const path = require('path');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const rootDir = require('../util/path');

exports.postUser = async (req,res,next) => {
    const username = req.body.username;
    const emailId = req.body.emailId;
    const password = req.body.password;

    const userExist = await User.findAll({where : {emailId: emailId}})
    console.log(userExist)

    if(userExist && userExist.length){
        res.status(500).json({ errormsg: 'User already exists with this email Id'})
    } else {
        const saltrounds = 10;
        bcrypt.hash(password,saltrounds, async(er,hash) => {
            const userDetails = await User.create({
                username: username,
                emailId: emailId,
                password: hash
            })
            res.status(201).redirect('/user/login')
        })
        
    }
}

exports.getLogin = (req,res,next) => {
    res.sendfile(path.join(rootDir, 'public','login.html'))
}

exports.postuserLogin = async (req,res,next) => {
    const emailId = req.body.emailId;
    const password = req.body.password;

    const registeruserExist = await User.findAll({where: {emailId: emailId}})

    if(registeruserExist && registeruserExist.length){
        bcrypt.compare(password, registeruserExist[0].password,(err,result) => {
            if(result == true){
                res.status(201).json({successMsg: 'User logged in successfully'})
            } else {
                res.status(401).json({errMsg: 'You entered wrong password. Try again', err: err})
            }
        })
    } else {
        res.status(404).json({errorMsg: 'User does not exist'})
    }

}