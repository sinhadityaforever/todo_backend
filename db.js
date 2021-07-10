const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Sinhaditya14082002",
  database: "todo_databse",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
