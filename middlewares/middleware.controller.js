const { config } = require("../config/config");
exports.checkApiKey = async (req, res, next) => {
  try {
    const apikey = req.headers.apikey || req.headers.api_key;
    if (apikey == config.apikey) {
      next();
    } else {
      return res.status(401).json({
        message: "You have no permission",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "You have no permission",
    });
  }
};
