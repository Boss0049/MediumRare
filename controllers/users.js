const connection = require("../services/database");

const getMyProfile = async (req, res) => {
  const id = req.user.id;
  const [users] = await connection.query("SELECT * FROM users where id = ?", [
    id,
  ]);
  res.status(200).send(users);
};

module.exports = {
  getMyProfile,
};
