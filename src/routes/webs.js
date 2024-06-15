const express = require("express");
const userController = require("../controllers/UserController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../authMiddleware/authMiddleware");
// let router = express.Router();
const ProductRouter = require("./ProductRouter");
const UserRouter = require("./UserRouters");

const routes = (app) => {
  //user
  app.use("/api/user", UserRouter);
  app.use("/api/products", ProductRouter);
};
module.exports = routes;
