const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('infoin', 'postgres', 'angga225', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;
