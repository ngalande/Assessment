

const express = require('express');
const router = express.Router();
const ServiceContainer = require('../services/index');
const UserController = require('../controllers/users.controller')
const UserControllerHandler = UserController(ServiceContainer);


router.post('/register', (req, res) =>
    UserControllerHandler.createUser(req, res)
)



router.post('/login', (req, res) => UserControllerHandler.loginUser(req, res))



module.exports = router;