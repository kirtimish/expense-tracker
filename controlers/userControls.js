const path = require('path');
const User = require('../models/user');
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
        const userDetails = await User.create({
            username: username,
            emailId: emailId,
            password: password
        })
        res.status(201).redirect('/user/login')
    }
}

exports.getLogin = (req,res,next) => {
    res.sendfile(path.join(rootDir, 'public','login.html'))
}