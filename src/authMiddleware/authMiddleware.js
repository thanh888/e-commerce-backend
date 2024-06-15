const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(404).json({
        message: "The authentication",
        status: "ERROR",
      });
    }
    const { payload } = user;
    if (!payload.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "The authentication",
        status: "ERROR",
      });
    }
  });
};

const authUserMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(404).json({
        message: "The authentication",
        status: "ERROR",
      });
    }
    const { payload } = user;
    if (!payload.isAdmin || payload?.id === userId) {
      next();
    } else {
      return res.status(404).json({
        message: "The authentication",
        status: "ERROR",
      });
    }
  });
};

module.exports = { authMiddleware, authUserMiddleware };