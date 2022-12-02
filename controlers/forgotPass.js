const uuid = require('uuid');
const sgMail = require('@sendgrid/mail');
const User = require('../models/user');
const ForgotPassword = require('../models/forgotPass');

exports.forgotPassword = async (req,res,next) => {
    try {
        const { email } = req.body;
        const user = User.findOne({where:{email}})

        if(user){
            const id = uuid.v4();
            user.createForgotPassword({id, active: true})
            .catch(err => {
                throw new Error(err)
            })

            sgMail.setApiKey(process.env.SENDGRID_API_KEY)

            const msg = {
                to: 'kirtimish.8383@gmail.com', // Change to your recipient
                from: 'kirtimish.8383@gmail.com', // Change to your verified sender
                subject: 'Sending with SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
            }

            sgMail
            .send(msg)
            .then((response) => {

                console.log(response[0].statusCode)
                console.log(response[0].headers)
                return res.status(response[0].statusCode).json({message: 'Link to reset password sent to your mail ', sucess: true})

            })
            .catch(error => {
                throw new Error(error)
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({ message: err, sucess: false });
    }
}