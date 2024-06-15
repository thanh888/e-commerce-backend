const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const sessions = {};
const createUser = (body) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, phone } = body;

    try {
      const user = await User.findOne({ email: email });
      if (user) {
        resolve({
          message: "Email already exists",
        });
        return;
      }

      const hashPassword = bcrypt.hashSync(password, 10);

      const result = await User.create({ ...body, password: hashPassword });

      if (result) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          result,
        });
        return;
      }
    } catch (error) {
      reject(error);
    }
  });
};

const signInUser = (body) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = body;

    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        resolve({
          message: "User not found",
        });
      }
      if (bcrypt.compareSync(password, user.password)) {
        const accessToken = await generalAccessToken({
          id: user._id,
          isAdmin: user.isAdmin,
        });

        const refreshToken = await generalRefreshToken({
          id: user._id,
          isAdmin: user.isAdmin,
        });

        user.password = undefined;
        resolve({
          message: "Login success",
          accessToken,
          refreshToken,
          user,
        });
      }
      resolve({ message: "Wrong password" });
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = (_id, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id });

      if (!user) {
        resolve({
          message: "User not found",
        });
      }
      const result = await User.findByIdAndUpdate(_id, body, {
        new: true,
      });

      result.password = undefined;

      resolve({
        message: "Update success",
        result,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const findAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await User.find();

      resolve({
        message: "OK",
        result,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const findOneUser = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await User.findById(_id);

      resolve({
        message: "OK",
        result,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const hardDeleteUser = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await User.findByIdAndDelete(_id);

      if (!result) {
        resolve({
          message: "User not found",
        });
      }

      resolve({
        message: "Delete success",
        result,
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createUser,
  signInUser,
  updateUser,
  hardDeleteUser,
  findAllUser,
  findOneUser,
};
