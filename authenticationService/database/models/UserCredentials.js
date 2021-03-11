const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const UserCredentialsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    user_id: {
      type: ObjectId,
      required: true,
    },
  },
  { collection: "userCredentials" }
);

const UserCredentials = mongoose.model(
  "userCredentials",
  UserCredentialsSchema
);

module.exports = UserCredentials;
