const express = require("express");
const { vouncher } = require("../controllers/validator.controller");
const {
  getVouncherController,
  createVouncherController,
  detailVouncherController,
  updateVouncherController,
  deleteVouncherController,
} = require("../controllers/vouncher.controller");
const { validate } = require("../middlewares/validate.middleware.controller");

const router = express.Router();
const baseURL = "/api/v1";

/**
 * vouncher get & register
 */
router
  .route(`${baseURL}/vouncher`)
  .get(getVouncherController)
  .post(validate(vouncher), createVouncherController);
/**
 * vouncher detail,update,delete
 */
router
  .route(`${baseURL}/vouncher/:vouncherId`)
  .get(detailVouncherController)
  .put(updateVouncherController)
  .delete(deleteVouncherController);
exports.default = (app) => {
  app.use("/", router);
};
