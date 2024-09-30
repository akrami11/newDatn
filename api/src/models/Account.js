const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema(
  {
    AID: { type: String, unique: true, maxLength: 20 },
    username: { type: String, unique: true, maxLength: 254 },
    password: { type: String, maxLength: 254 },
    level: { type: String, maxLength: 1, defaultValue: 1 },
    deletedAt: { type: Date, default: null },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Account', Account);
