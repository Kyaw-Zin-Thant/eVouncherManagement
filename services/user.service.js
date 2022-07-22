const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const fs = require("fs");
const privateKey = fs.readFileSync("config/jwtRS256.key", "utf8");
const jwt = require("jsonwebtoken");
//register
exports.userRegisterService = async ({ phonenumber, password }) => {
  try {
    const user = new User({ phonenumber });
    user.password = await updateHash(password);
    await user.save();
    return { message: "Successfully Register", userId: user._id };
  } catch (error) {
    throw error;
  }
};
//login
exports.userLoginService = async ({ phonenumber, password }) => {
  try {
    const user = await User.findOne({ phonenumber });
    console.log(user);
    if (user) {
      const { _id: userId } = user;

      const token = jwt.sign(
        {
          userId,
        },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "24h",
        }
      );
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return {
          message: "Successfully Login",
          userId: userId,
          token,
        };
      } else {
        let passwordWrong = new Error("Password is wrong.");
        passwordWrong.status = 400;
        throw passwordWrong;
      }
    } else {
      let notFoundError = new Error(
        "User does not exist with this phone number"
      );
      notFoundError.status = 400;
      throw notFoundError;
    }
  } catch (error) {
    throw error;
  }
};
//password hashing
function updateHash(password) {
  try {
    return new Promise((resolve, reject) => {
      const hash = bcrypt.hashSync(password, 13);
      resolve(hash);
    });
  } catch (err) {
    throw err;
  }
}
