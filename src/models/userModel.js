const pool = require('../config/db');

const getUserList = async () => {
  try {
    const query = 'SELECT * FROM users';
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error(error);
    // throw new Error('Terjadi kesalahan saat mengambil daftar pengguna');
  }
};

module.exports = {
  getUserList,
};