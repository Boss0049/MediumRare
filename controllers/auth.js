const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../services/database");
const { JWT_SECRET, JWT_EXPIRE_TIMEOUT } = require("../configs/constants");

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const lowerUsername = username.toLowerCase();

  const data = await connection.query(
    `SELECT * FROM users WHERE username = '${lowerUsername}'`
  );
  if (data[0].length === 0) {
    return res
      .status(401)
      .send({ message: "Username or Password is incorrect" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, data[0][0].password);

  if (!isPasswordCorrect) {
    return res
      .status(401)
      .send({ message: "Username or Password is incorrect" });
  }

  const payload = { id: data[0][0].id, role: data[0][0].role };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE_TIMEOUT,
  });
  res.status(200).send({ message: "success", token: token });
};

const register = async (req, res) => {
  try {
    let errorMessage = "";
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const role = req.body.role;

    const lowerUsername = username.toLowerCase();

    if (lowerUsername.length < 4) {
      errorMessage = "Username must be more than 4 characters";
    } else if (password.length < 4) {
      errorMessage = "Password must be more than 4 characters";
    } else if (firstName.length < 3) {
      errorMessage = "FirstName must be more than 4 characters";
    } else if (lastName.length < 3) {
      errorMessage = "LastName must be more than 4 characters";
    }

    if (errorMessage !== "") {
      return res.status(400).send({ message: errorMessage });
    }

    const rows = await connection.query(
      `SELECT * FROM users WHERE username = '${lowerUsername}'`
    );

    if (rows[0].length === 0) {
      const hashPassword = await bcrypt.hash(password, 12);
      await connection.query(
        `INSERT INTO \`users\` (\`username\`, \`password\`, \`first_name\`, \`last_name\`, \`role\`) VALUES ('${lowerUsername}', '${hashPassword}', '${firstName}', '${lastName}','${role}')`
      );
      return res.status(201).send({ message: "User is created" });
    } else {
      return res.status(400).send({ message: "Username Already Exist" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { login, register };
