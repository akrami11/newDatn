const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema(
  {
    ID: { type: String, unique: true, maxlength: 20 },
    firstName: { type: String, maxlength: 50 },
    lastName: { type: String, maxlength: 50 },
    image: { type: String },
    dateOfBirth: { type: Date },
    sex: { type: String, maxlength: 10 },
    address: { type: String, maxlength: 254 },
    phone: { type: String, maxlength: 13 },
    email: { type: String, maxlength: 130 },
    authorName: { type: String, maxlength: 130 },
    AID: { type: String, unique: true, maxlength: 20 },
    vip: { type: Number, defaultValue: 0 },
    money: { type: Number, defaultValue: 0 },
    opened: [
      {
        ID: { type: String, unique: true, maxLength: 20 },
        chapter: { type: String },
        name: { type: String },
        image: { type: String },
      },
    ],
    follow: [
      {
        ID: { type: String, unique: true, maxLength: 20 },
        name: { type: String },
        image: { type: String },
      },
    ],
    deletedAt: { type: Date, default: null },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Customer', Customer);
