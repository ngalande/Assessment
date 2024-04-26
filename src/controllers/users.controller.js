const UserController = (serviceContainer) => {
    const createUser = async (req, res) => {
        try {
            const user = await serviceContainer.userService.addUser(req.body);
            return res.status(201).json({
                success: true,
                message: `User successfully Created`,
                data: user
            })


        } catch (error) {
            console.log(error)
            return res.status(400).json({
                success: false,
                error: error.message
            })
        }
    }

    const getUsers = async (req, res) => {
        try {
            const users = await serviceContainer.userService.getUsers();
            return res.status(200).send(users)
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                success: false,
                error: error.message
            })
        }
    }



    const getUser = async (req, res) => {
        try {
            const user = await serviceContainer.userService.getUser(req.params.id);
            return res.status(200).send(user)
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            })
        }
    }

    const deleteUser = async (req, res) => {
        const id = req.params.id;
        try {
            await serviceContainer.userService.deleteUser(id);
            return res.status(200).send({
                success: true,
                message: `User deleted!`
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message,
                message: `User doesn't exist`
            })
        }
    }

    const updateUser = async (req, res) => {
        const id = req.params.id

        try {
            const user = await serviceContainer.userService.updateUser(id, req.body)
            return res.status(200).json({
                success: true,
                message: `User successfully updated`,
                data: user
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            })
        }
    }
    const { JWT_SECRET } = process.env;

    const loginUser = async (req, res) => {
        //return res.send("login")
        try {
            const user = await serviceContainer.userService.loginUser(req.body);
            return res.status(200).send(user)
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            })
        }
    }



    return {
        createUser,
        getUsers,
        getUser,
        deleteUser,
        updateUser,
        loginUser
    }
}

module.exports = UserController;

