const {
  getVouncherService,
  createVouncherService,
  detailVouncherService,
  updateVouncherService,
  deleteVouncherService,
} = require("../services/vouncher.service");

//get all  vounchers
exports.getVouncherController = async (req, res, next) => {
  try {
    const {
      search = "",
      page = 1,
      limit = 10,
      sortDirection = "desc",
      sortColumn = "createdAt",
    } = req.query;
    const response = await getVouncherService({
      search,
      page,
      limit,
      sortDirection,
      sortColumn,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

//create vouncher
exports.createVouncherController = async (req, res, next) => {
  try {
    const {
      title,
      description,
      expiredDate,
      amount,
      paymethod,
      paymethodDiscounts,
      quantity,
      buyType,
    } = req.body;
    const response = await createVouncherService({
      title,
      description,
      expiredDate,
      amount,
      paymethod,
      paymethodDiscounts,
      quantity,
      buyType,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

//detail vouncher
exports.detailVouncherController = async (req, res, next) => {
  try {
    const { vouncherId } = req.params;

    const fileUrl = req.protocol + "://" + req.headers.host;
    const response = await detailVouncherService({ vouncherId, fileUrl });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

//update vouncher
exports.updateVouncherController = async (req, res, next) => {
  try {
    const {
      vouncherId,
      title,
      description,
      expiredDate,
      amount,
      paymethod,
      paymethodDiscounts,
      quantity,
      buyType,
      status,
    } = { ...req.params, ...req.body };
    const response = await updateVouncherService({
      vouncherId,
      title,
      description,
      expiredDate,
      amount,
      paymethod,
      paymethodDiscounts,
      quantity,
      buyType,
      status,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

//delete vehicle
exports.deleteVouncherController = async (req, res, next) => {
  try {
    const { vouncherId } = req.params;
    const response = await deleteVouncherService({ vouncherId });
    res.json(response);
  } catch (error) {
    next(error);
  }
};
