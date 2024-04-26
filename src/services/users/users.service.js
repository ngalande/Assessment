const db = require('../../models');
const User = db.user
const UserRepository = require('../../repositories/users.repository')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


const { JWT_SECRET } = process.env;


const UserService = () => {
    const addUser = async (Data) => {
        const { email } = Data;

        //check if the user already exists
        const userExists = await UserRepository.findUserByEmail(email);
        if (userExists) {
            throw new Error("User already exists")
        }

        await User.create(Data)
        console.log('I am here');
    }

    const loginUser = async (Data) => {
        const { email, password } = Data;
        //check if user exists
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            return res.status(401).json({ message: "Don't have an account? Please Register!", });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Incorrect password, try again' });
        // await user.generateAuthToken()
        //await user.generateRefreshToken();
        const token = jwt.sign({ "id": user.id, "email": user.email }, JWT_SECRET, { expiresIn: '1h' })
        // //checking user password
        // const isMatch = await bcrypt.compare(password, users.password);
        // if(!isMatch){
        //     throw new Error("Don't have an account? Please Register!")
        // }

        return {
            userId: user.id,
            token: token,
            message: "login successful",
        };




    }

    const getUsers = async () => {
        const users = await UserRepository.findAllUsers();
        if (users.length < 1) {
            throw new Error("No users found")
        }
        return users
    }

    const getUser = async (id) => {
        const user = await UserRepository.findUser(id);
        if (!user) {
            throw new Error(" User not found ")
        }
        return user
    }



    const deleteUser = async (id) => {
        const user = await UserRepository.deleteUser(id);
        if (!user) {
            throw new Error(" User not found ")
        }
        return user
    }

    const updateUser = async (id, Data) => {
        const user = await UserRepository.findUserByID(id)
        if (!user) {
            throw new Error("User not found")
        }

        await User.update(Data, { where: { id: id } })
    }



    return {
        addUser,
        loginUser,
        getUsers,
        getUser,
        deleteUser,
        updateUser
    }
}

module.exports = UserService;