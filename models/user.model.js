const mongoose = require("mongoose");
const { Schema } = mongoose;
const schema = {
  phonenumber: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
};
const UserSchema = new Schema(schema, {
  timestamps: {
    createdAt: "createdDate",
    updatedAt: "updatedDate",
  },
});

module.exports = mongoose.model("USER", UserSchema);
