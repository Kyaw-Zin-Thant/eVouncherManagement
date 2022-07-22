const Vouncher = require("../models/vouncher.model");
const QRCode = require("qrcode-svg");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
//get all registered vounchers
exports.getVouncherService = async ({
  search,
  page,
  limit,
  sortDirection,
  sortColumn,
}) => {
  try {
    sortDirection = sortDirection === "desc" ? -1 : 1;
    const skip = (page - 1) * limit;
    let searchQuery = {
      $match: {},
    };
    if (search) {
      searchQuery = {
        $match: {
          $or: [
            {
              title: {
                $regex: search,
                $options: "i",
              },
            },
            {
              description: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        },
      };
    }
    sortQuery =
      sortColumn === "createdDate"
        ? {
            $sort: {
              createdDate: sortDirection,
            },
          }
        : {
            $sort: {
              sortTitle: sortDirection,
            },
          };
    const result = await Vouncher.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $in: ["$status", ["ACTIVE", null]] },
              { $gte: ["$expiredDate", new Date()] },
            ],
          },
        },
      },
      {
        $project: {
          _id: 0,
          vouncherId: "$_id",
          title: 1,
          sortTitle: { $toLower: "$title" },
          description: 1,
          amount: 1,
          createdDate: 1,
        },
      },
      searchQuery,
      sortQuery,
      {
        $project: {
          vouncherId: 1,
          title: 1,
          description: 1,
          amount: 1,
          createdDate: 1,
        },
      },
      {
        $facet: {
          vounchers: [
            { $skip: parseInt(skip, 10) },
            { $limit: parseInt(limit, 10) },
          ],
          totalCount: [
            {
              $count: "count",
            },
          ],
        },
      },
    ]);
    let response = {};
    const { vounchers, totalCount } = result[0];
    response.vounchers = vounchers;
    response.totalCount = totalCount[0] ? totalCount[0].count : 0;
    response.sortDirection = sortDirection === -1 ? "desc" : "asc";
    response.sortColumn = sortColumn;
    return response;
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
      image: process.cwd() + `/public/qrcode/${vouncherCode}.svg`,
    });
    await vouncher.save();
    return { message: "Successfully Registered", vouncherId: vouncher._id };
  } catch (error) {
    throw error;
  }
};

//detail vouncher
exports.detailVouncherService = async ({ vouncherId, fileUrl }) => {
  try {
    const vouncher = await Vouncher.findOne(
      { _id: vouncherId },
      {
        _id: 0,
        vouncherId: "$_id",
        vouncherCode: 1,
        title: 1,
        description: 1,
        expiredDate: 1,
        image: 1,
        amount: 1,
      }
    );
    const imagePath = process.cwd() + "/";
    vouncher.image = vouncher.image
      ? vouncher.image.replace(imagePath, fileUrl + "/")
      : "";
    return { vouncher };
  } catch (error) {
    throw error;
  }
};

//update vouncher
exports.updateVouncherService = async ({
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
}) => {
  try {
    let updateData = status
      ? { status }
      : {
          title,
          description,
          expiredDate,
          amount,
          paymethod,
          paymethodDiscounts,
          quantity,
          buyType,
        };
    await Vouncher.updateOne(
      { _id: ObjectId(vouncherId) },
      { $set: updateData }
    );
    return { message: "Successfully Updated" };
  } catch (error) {
    throw error;
  }
};

//delete vouncher
exports.deleteVouncherService = async ({ vouncherId }) => {
  try {
    await Vouncher.deleteOne({ _id: ObjectId(vouncherId) });
    return { message: "Successfully Deleted" };
  } catch (error) {
    throw error;
  }
};
const generateQr = (qrString) => {
  return new Promise((resolve, reject) => {
    var qrcode = new QRCode({
      content: qrString + "",
      padding: 4,
      width: 256,
      height: 256,
      color: "#000000",
      background: "#ffffff",
      ecl: "M",
    });
    qrcode.save(
      process.cwd() + `/public/qrcode/${qrString}.svg`,
      function (error) {
        if (error) throw reject(error);
        resolve("Done");
      }
    );
  });
};
