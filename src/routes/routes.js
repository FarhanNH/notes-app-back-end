const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('../controllers/handler');

const userController = require('../controllers/userController');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
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
];

module.exports = routes;
