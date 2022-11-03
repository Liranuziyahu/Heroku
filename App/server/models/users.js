module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        userID:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: Sequelize.STRING
        },
        userEmail: {
            type: Sequelize.STRING
        },
        userPassword: {
            type: Sequelize.STRING
        },
        roleID: {
            type: Sequelize.INTEGER
        }
    }
    ,{timestamps: false})

    return User
}