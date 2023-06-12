const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'notes',
  user: '',
  password: '',
});

module.exports = pool;
