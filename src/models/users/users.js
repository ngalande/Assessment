const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Users", {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
            defaultValue: function () {
                return 'U-' + (Math.floor(Math.random() * 900000) + 100000);
            },
        },
        username: {
            type: Sequelize.STRING
        },

        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                const hashedPassword = bcrypt.hashSync(value, 10);
                this.setDataValue('password', hashedPassword);
            }
        },
    }, {
        timestamps: false,
    });



    return User;
};