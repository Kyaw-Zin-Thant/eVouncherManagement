const mongoose = require("mongoose");
const { Schema } = mongoose;
const schema = {
  vouncherCode: {
    type: String,
    unique: true,
  },
  title: String,
  description: String,
  expiredDate: Date,
  image: String,
  amount: String,
  paymethod: String,
  paymethodDiscounts: [
    {
      paymethod: String,
      percent: Number,
    },
  ],
  quantity: Number,
  buyType: {
    type: {
      type: String,
      enum: ["MYSELF", "GIFT"],
    },
    name: String,
    phoneNumber: String,
    buyLimit: Number,
    giftUserLimit: Number,
  },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE", "USED"],
  },
};
const VouncherSchema = new Schema(schema, {
  timestamps: {
    createdAt: "createdDate",
    updatedAt: "updatedDate",
  },
});

module.exports = mongoose.model("VOUNCHER", VouncherSchema);
