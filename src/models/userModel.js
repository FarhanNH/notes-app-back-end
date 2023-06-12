const pool = require('../config/db');

const addUser = async (user) => {
  const query = 'INSERT INTO users (username, email, password, role, createdAt, createdBy, updatedAt, updatedBy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
  const values = [
    user.username,
    user.email,
    user.password,
    user.role,
    user.createdAt,
    user.createdBy,
    user.updatedAt,
    user.updatedBy,
  ];
  const client = await pool.connect();
  try {
    const { rows } = await client.query(query, values);
    return rows;
  } catch (error) {
    throw new Error(error);
  } finally {
    client.release(); // Melepaskan koneksi klien setelah selesai
  }
};

const getUserList = async () => {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM users';
    const { rows } = await client.query(query);
    return rows;
  } catch (error) {
    throw new Error(error);
    // throw new Error('Terjadi kesalahan saat mengambil daftar pengguna');
  } finally {
    client.release();
  }
};

const getUserById = async (id) => {
  const client = await pool.connect();
  try {
    const query = {
      // give the query a unique name
      name: 'fetch-user',
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };
    // const query = `SELECT * FROM users where id=${id}`;
    const { rows } = await client.query(query);
    return rows[0];
  } catch (error) {
    throw new Error(error);
  } finally {
    client.release();
  }
};

module.exports = {
  addUser,
  getUserList,
  getUserById,
};
