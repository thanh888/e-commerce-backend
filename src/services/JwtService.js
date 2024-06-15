const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const generalAccessToken = (payload) => {
  const accessToken = jwt.sign(
    {
      payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "30s" }
  );

  return accessToken;
};

const generalRefreshToken = (payload) => {
  const refreshToken = jwt.sign(
    {
      payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "365d" }
  );

  return refreshToken;
};

const refreshTokenJwtService = (token) => {
  return new Promise(async (resolve, reject) => {
    console.log(token);
    try {
      jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
        if (err) {
          resolve({
            message: "The authentication",
            status: "ERROR",
          });
        }
        console.log(user);
        const { payload } = user;
        const accessToken = await generalAccessToken({
          id: payload?.id,
          isAdmin: payload?.isAdmin,
        });

        resolve({
          message: "OK",
          result: accessToken,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  generalAccessToken,
  generalRefreshToken,
  refreshTokenJwtService,
};
