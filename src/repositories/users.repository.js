const db = require('../models');
const User = db.user


const UserRepository = () => {
    const findUserByEmail = async (email) => {
        return User.findOne({ where: { email: email } })
    }

    const findAllUsers = async () => {
        return User.findAll()
    }


    const findUser = async (id) => {
        return User.findOne({ where: { id: id } })
    }

    const findUserByID = async (id) => {
        return User.findOne({ where: { id: id } })
    }

    const deleteUser = async (id) => {
        return User.destroy({ where: { id: id }, force: true })
    }

    return {
        findUserByEmail,
        findAllUsers,
        findUser,
        findUserByID,
        deleteUser,
    }
}

module.exports = UserRepository();