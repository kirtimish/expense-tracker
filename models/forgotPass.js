const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const ForgotPassword = sequelize.define('forgotPassword', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    active: Sequelize.BOOLEAN,
    expiresBy: Sequelize.DATE
})

module.exports = ForgotPassword;