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
      status: 'SUCCESS',
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
      status: 'SUCCESS',
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
    if (!user) {
      throw {
        code: 404,
        message:'USER_NOT_FOUND'
      }
    }
    const response = h.response({
      status: 'SUCCESS',
      data: user,
    });
    return response;
  } catch (error) {
    console.error(error);
    if (!error) {
      error.code = 500;
    }
    const response = h.response({
      status: 'FAILED',
      message: error.message,
    }).code(error.code);
    return response;
  }
};

const updateUserById = async (request, h) => {
  try {
    const { id } = request.params;
    const userDb = await userModel.getUserById(id);
    if (!userDb) {
      throw {
        code: 404,
        message:'USER_NOT_FOUND'
      }
    }

    const {
      username,
      email,
      password,
      role,
    } = request.payload;

    const updatedAt = new Date();

    const newData = {
      username,
      email,
      password,
      role,
      updatedAt,
      updatedBy: userDb.id,
    };

    const rowCount = await userModel.updateUserById(userDb.id, newData);
    if (rowCount != 1) {
      throw {
        code: 500,
        message: 'USER_UPDATE_FAILED',
      }
    }
    const response = h.response({
      status: 'SUCCESS',
      message: 'USER_UPDATE_SUCCESS',
    });
    return response;
  } catch (error) {
    console.error(error);
    if (!error) {
      error.code = 500;
    }
    const response = h.response({
      status: 'FAILED',
      message: error.message,
    }).code(error.code);
    return response;
  }
};

const deleteUserById = async (request, h) => {
  const { id } = request.params;
  try {
    const userDb = await userModel.getUserById(id);
    if (!userDb) {
      throw {
        code: 404,
        message:'USER_NOT_FOUND'
      }
    }
    const rowCount = await userModel.deleteUserById(id);
    if (rowCount != 1) {
      throw {
        code: 500,
        message: 'USER_DELETE_FAILED',
      }
    }
    const response = h.response({
      status: 'SUCCESS',
      message: 'USER_DELETE_SUCCESS',
    });
    return response;
  } catch (error) {
    console.error(error);
    if (!error) {
      error.code = 500;
    }
    const response = h.response({
      status: 'FAILED',
      message: error.message,
    }).code(error.code);
    return response;
  }
};

module.exports = {
  addUser,
  getUserList,
  getUserById,
  updateUserById,
  deleteUserById,
};
