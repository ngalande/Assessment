

const express = require('express');
const router = express.Router();
const ServiceContainer = require('../services/index');
const UserController = require('../controllers/users.controller')
const UserControllerHandler = UserController(ServiceContainer);


// router.post('/register', (req, res) =>
//     UserControllerHandler.createUser(req, res)
// )



// router.post('/login', (req, res) => UserControllerHandler.loginUser(req, res))


router.get('/get-users', (req, res) =>
    UserControllerHandler.getUsers(req, res)
)

router.get('/get-user/:id', (req, res) =>
    UserControllerHandler.getUser(req, res)
)

router.delete('/delete-user/:id', (req, res) =>
    UserControllerHandler.deleteUser(req, res)
)

router.put('/update-user/:id', (req, res) =>
    UserControllerHandler.updateUser(req, res)
)

module.exports = router;