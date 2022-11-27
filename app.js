const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequalize = require('./util/database');
const Expense = require('./models/expense');

const rootDir = require('./util/path');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expenseRoutes);

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
