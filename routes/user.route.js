const express = require("express");
const {
  userRegisterController,
  userLoginController,
} = require("../controllers/user.controller");

const router = express.Router();
const baseURL = "/api/v1";

/**
 * user register
 */
router.route(`${baseURL}/user`).post(userRegisterController);
/**
 * user login
 */
router.route(`${baseURL}/user/login`).post(userLoginController);
exports.default = (app) => {
  app.use("/", router);
};
