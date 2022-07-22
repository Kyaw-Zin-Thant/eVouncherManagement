const {
  userRegisterService,
  userLoginService,
} = require("../services/user.service");

//register
exports.userRegisterController = async (req, res, next) => {
  try {
    const { phonenumber, password } = req.body;
    const response = await userRegisterService({
      phonenumber,
      password,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

//detail vouncher
exports.userLoginController = async (req, res, next) => {
  try {
    const { phonenumber, password } = req.body;
    const response = await userLoginService({ phonenumber, password });
    res.json(response);
  } catch (error) {
    next(error);
  }
};
