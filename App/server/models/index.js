const dbConfig = require('../config/connection')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB ,dbConfig.USER , dbConfig.PASSWORD ,{
    host:'eu-cdbr-west-03.cleardb.net',
    port:3306,
    dialect:'mysql', 
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// Tables - mySQL
db.users = require('./user')(sequelize , Sequelize)
db.exams = require('./exams')(sequelize , Sequelize)
db.questions = require('./questions')(sequelize , Sequelize)
db.user_answers = require('./user_answers')(sequelize , Sequelize)

module.exports = db;