const UserService = require('./users/users.service')


const ServiceContainer = () => {
    return {
        userService: UserService(),
    }
}

module.exports = ServiceContainer();