const mysql = require("mysql2");
const {
  DB_PORT,
  DB_DATABASE,
  DB_PASSWORD,
  DB_USER,
  DB_HOST,
} = require("../configs/constants");

const dbConfig = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err, connection) => {
  if (err) {
    console.log(err);
    console.log("Cannot connect database");
  } else {
    console.log("Database is connected");
  }
});

connection.on("error", (err) => {
  console.log(err);
});

module.exports = connection.promise();
