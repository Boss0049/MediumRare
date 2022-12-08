const express = require("express");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const { SERVER_PORT } = require("./configs/constants");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(SERVER_PORT, () => {
  console.log(`App is running at port ${SERVER_PORT}`);
});
