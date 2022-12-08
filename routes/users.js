const express = require("express");
const usersController = require("../controllers/users");
const { authenticateToken } = require("../middlewares/jwt");

const router = express.Router();

router.use(authenticateToken);

router.get("/my-profile", usersController.getMyProfile);

module.exports = router;
