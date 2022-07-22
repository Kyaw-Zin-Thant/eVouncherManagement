const fs = require("fs");
const publicKey = fs.readFileSync("./config/jwtRS256.key.pub", "utf8");
const jwt = require("jsonwebtoken");
exports.checkToken = async (req, res, next) => {
  try {
    console.log(req.path, " ", req.path.includes("/meeting"));
    if (
      req.path == "/api/v1/user/login" ||
      (req.path == "/api/v1/user" && req.method == "POST") ||
      req.method == "OPTIONS" ||
      req.path.includes("/public")
    ) {
      next();
    } else {
      console.log(req.headers.Authorization);
      var token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, publicKey, {
        algorithms: ["RS256"],
      });
      const { userId } = decoded;
      req.headers.userId = userId;
      next();
    }
  } catch (error) {
    console.log(error, " error");
    return res.status(401).json({
      message: "Token Expired",
    });
  }
};
