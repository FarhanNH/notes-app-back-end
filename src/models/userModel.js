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
    const { rows } = await client.query(query);
    return rows[0];
  } catch (error) {
    throw new Error(error);
  } finally {
    client.release();
  }
};

const updateUserById = async (id, cols) => {
  // Setup static beginning of query
  let query = ['UPDATE users'];
  query.push('SET');

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  let set = [];
  Object.keys(cols).forEach(function (key, i) {
    set.push(key + ' = ($' + (i + 1) + ')'); 
  });
  query.push(set.join(', '));

  // Add the WHERE statement to look up by id
  query.push('WHERE id = ' + id );

  // Return a complete query string
  let sql = query.join(' ');

  // Turn req.body into an array of values
  let colValues = Object.keys(cols).map(function (key) {
    return cols[key];
  });
  
  const client = await pool.connect();
  try {
    const { rowCount } = await client.query(sql, colValues);
    return rowCount;
  } catch (error) {
    throw new Error(error);
  } finally {
    client.release();
  }
};

const deleteUserById = async (id) => {
  const client = await pool.connect();
  try {
    const query = {
      // give the query a unique name
      name: 'delete-user',
      text: 'DELETE FROM users WHERE id = $1',
      values: [id],
    };
    const { rowCount } = await client.query(query);
    return rowCount;
  } catch (error) {
    throw new Error(error);
  } finally {
    client.release();
  }
}

module.exports = {
  addUser,
  getUserList,
  getUserById,
  updateUserById,
  deleteUserById,
};
