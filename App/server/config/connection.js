module.exports ={
    HOST: 'eu-cdbr-west-03.cleardb.net',
    USER: 'b404883b085267',
    PASSWORD: 'd4659113',
    DB: 'heroku_6edf401c8513f78',
    dialect: 'mysql',
    PORT: 3306,
    pool:{
        max: 5,
        min:0,
        acquire: 30000,
        idle:10000
    }
    
}