const User = require("../models/UserModel");
const userService = require("../services/UserService");
const jwtService = require("../services/JwtService");
const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, confirm_password } = req.body;
    if (!name || !email || !password || !phone || !confirm_password) {
      return res.status(404).json({
        message: "All fields are required",
      });
    }

    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailFormat.test(email)) {
      return res.status(404).json({
        message: "Invalid email format",
      });
    }

    if (confirm_password !== password) {
      return res.status(404).json({
        message: "Password doesn't match",
      });
    }

    delete req.body.confirm_password;
    const result = await userService.createUser(req.body);

    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({
      message: "All fields are required",
    });
  }
  const result = await userService.signInUser(req.body);
  return res.status(200).json({ result });
};

const findAllUser = async (req, res) => {
  const result = await userService.findAllUser();

  return res.status(200).json({ result });
};

const refreshToken = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(200).json({
      message: "No token provided",
      status: "ERR",
    });
  }
  const result = await jwtService.refreshTokenJwtService(token);

  return res.status(200).json({ result });
};

const findOneUser = async (req, res) => {
  const id = req.params.id;
  console.log("hdfhsd", id);

  const result = await userService.findOneUser(id);

  return res.status(200).json(result);
};

const updateUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const body = req.body;

    const result = await userService.updateUser(_id, body);

    return res.status(200).json({
      message: "OK",
      result,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const hardDeleteUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const body = req.body;

    const result = await userService.hardDeleteUser(_id, body);

    return res.status(200).json({
      message: "OK",
      result,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  createUser,
  signInUser,
  updateUser,
  hardDeleteUser,
  findAllUser,
  findOneUser,
  refreshToken,
};
