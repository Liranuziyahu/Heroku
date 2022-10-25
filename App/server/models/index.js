const dbConfig = require('./../config/db.config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB , dbConfig.USER, dbConfig.PASSWORD ,{
    host: dbConfig.HOST, 
    dialect:dbConfig.dialect, 
    operatorsAliases:false,
    pool:{
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
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