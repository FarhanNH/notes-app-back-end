const userController = require('../controllers/userController');

const routes = [
    {
        method: 'POST',
        path: '/users',
        handler: userController.addUser,
    },
    {
        method: 'GET',
        path: '/users',
        handler: userController.getUserList,
    },
    {
        method: 'GET',
        path: '/users/{id}',
        handler: userController.getUserById,
    },
    {
        method: 'PUT',
        path: '/users/{id}',
        handler: userController. updateUserById,
    },
    {
        method: 'DELETE',
        path: '/users/{id}',
        handler: userController. deleteUserById,
    },
]

module.exports = routes;