const userModel = require('../models/userModel');

const getUserList = async (request, h) => {
    try {
      const userList = await userModel.getUserList();
      return h.response(userList);
    } catch (error) {
      console.error(error);
      return h.response('Terjadi kesalahan').code(500);
    }
  };
  
  module.exports = {
    getUserList,
  };