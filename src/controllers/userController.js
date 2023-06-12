const userModel = require('../models/userModel');

const addUser = async (request, h) => {
  try {
    const {
      username,
      email,
      password,
      role,
    } = request.payload;
    const createdAt = new Date();
    const updatedAt = createdAt;

    const newUser = {
      username,
      email,
      password,
      role,
      createdAt,
      createdBy: 1,
      updatedAt,
      updatedBy: 1,
    };

    const user = await userModel.addUser(newUser);
    const response = h.response({
      status: 'success',
      data: {
        user,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return h.response('Terjadi kesalahan').code(500);
  }
};

const getUserList = async (request, h) => {
  try {
    const userList = await userModel.getUserList();
    const response = h.response({
      status: 'success',
      data: userList,
    });
    return response;
  } catch (error) {
    console.error(error);
    return h.response('Terjadi kesalahan').code(500);
  }
};

const getUserById = async (request, h) => {
  const { id } = request.params;
  try {
    const user = await userModel.getUserById(id);
    const response = h.response({
      status: 'success',
      data: user,
    });
    return response;
  } catch (error) {
    console.error(error);
    return h.response('Terjadi kesalahan').code(500);
  }
};

module.exports = {
  addUser,
  getUserList,
  getUserById,
};
