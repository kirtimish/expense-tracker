require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
const sequalize = require('./util/database');
const Expense = require('./models/expense');
const User = require('./models/user')
const Order = require('./models/order');
const ForgotPassword = require('./models/forgotPass');

const rootDir = require('./util/path');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes')
const purchaseRoutes = require('./routes/purchaseRoutes')
const forgotPassRoutes = require('./routes/forgotPass');
const DownloadUrl = require('./models/downloadUrl');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expenseRoutes);
app.use('/user',userRoutes);
app.use('/purchase',purchaseRoutes);
app.use('/password', forgotPassRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);

User.hasMany(DownloadUrl)
DownloadUrl.belongsTo(User)

sequalize
.sync()
.then((result) => {
    app.listen('3000',() => {
        // console.log(result);
        console.log('Server listening on port 3000');
    })
})
.catch(err => {
    console.log(err);
})