const { Pool } = require('pg');

const credentials = {
    user: process.env.PGUSER,
    host: process.env.HOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  };


  // Database Connection
  const pool = new Pool(credentials);

  module.exports = pool ;