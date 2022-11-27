const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
const sequalize = require('./util/database');
const Expense = require('./models/expense');
const User = require('./models/user')

const rootDir = require('./util/path');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes')

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expenseRoutes);
app.use(userRoutes);

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
