const {Sequilize} = require('sequelize');

const sequelize = new Sequilize('postgres://postgres:angga225:5432/infoin');

module.exports = sequelize;
