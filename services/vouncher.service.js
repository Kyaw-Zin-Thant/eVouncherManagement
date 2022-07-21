const Vouncher = require("../models/vouncher.model");
const QRCode = require("qrcode");
//get all registered vounchers
exports.getVouncherService = async ({
  search,
  page,
  limit,
  sortDirection,
  sortColumn,
}) => {
  try {
    const skip = (page - 1) * limit;
    sortDirection = sortDirection.toUpperCase();
    // query param
    let queryData = search
      ? {
          offset: skip,
          limit,
          order: [[sortColumn, sortDirection]],
          where: {
            vehiclename: {
              [Op.eq]: search,
            },
          },
        }
      : {
          offset: skip,
          limit,
          order: [[sortColumn, sortDirection]],
        };
    const vehicles = await db.Vehicle.findAll(queryData);
    return { vehicles };
  } catch (error) {
    throw error;
  }
};

//create vouncher
exports.createVouncherService = async ({
  title,
  description,
  expiredDate,
  amount,
  paymethod,
  paymethodDiscounts,
  quantity,
  buyType,
}) => {
  try {
    //save data
    const vouncherCode = Math.floor(Math.random() * Date.now());
    await generateQr(vouncherCode);
    const vouncher = new Vouncher({
      vouncherCode,
      title,
      description,
      expiredDate,
      amount,
      paymethod,
      paymethodDiscounts,
      quantity,
      buyType,
      image: process.cwd() + `/public/qrcode/${vouncherCode}.png`,
    });
    await vouncher.save();
    return { message: "Successfully Registered", vouncherId: vouncher._id };
  } catch (error) {
    throw error;
  }
};

//detail vouncher
exports.detailVouncherService = async ({ vehicleId }) => {
  try {
    const vehicle = await db.Vehicle.findOne({
      where: { id: vehicleId },
      include: [{ model: db.Location, as: "locations" }],
    });
    return { vehicle };
  } catch (error) {
    throw error;
  }
};

//update vouncher
exports.updateVouncherService = async ({ vehicleId, vehiclename, imei }) => {
  try {
    await db.Vehicle.update(
      { vehiclename, imei },
      {
        where: { id: vehicleId },
      }
    );
    return { message: "Successfully Updated" };
  } catch (error) {
    throw error;
  }
};

//delete vouncher
exports.deleteVouncherService = async ({ vehicleId }) => {
  try {
    await db.Vehicle.destroy({
      where: { id: vehicleId },
    });
    return { message: "Successfully Deleted" };
  } catch (error) {
    throw error;
  }
};
const generateQr = (qrString) => {
  return new Promise((resolve, reject) => {
    QRCode.toFile(
      process.cwd() + `/public/qrcode/${qrString}.png`,
      qrString,
      {
        color: {
          light: "#0000", // Transparent background
        },
      },
      function (err) {
        if (err) throw reject(err);
        resolve("Done");
      }
    );
  });
};
