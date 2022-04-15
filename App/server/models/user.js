module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        userID:{
            type: Sequelize.UUID,
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
        userRole: {
            type: Sequelize.INTEGER
        }
    })

    return User
}