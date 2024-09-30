const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    ID: { type: String, unique: true, maxLength: 20 },
    firstName: { type: String, maxLength: 50 },
    lastName: { type: String, maxLength: 50 },
    image: { type: String },
    dateOfBirth: { type: Date },
    sex: { type: String, maxLength: 10 },
    address: { type: String, maxLength: 254 },
    civilID: { type: String, maxLength: 12 },
    phone: { type: String, maxLength: 13 },
    email: { type: String, maxLength: 130 },
    salary: { type: String, maxLength: 10 },
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
    schedule: [
      {
        shift: { type: String, maxLength: 1, defaultValue: 1 },
        time: { type: Date },
      },
    ],
    follow: [
      {
        ID: { type: String, unique: true, maxLength: 20 },
        name: { type: String },
        image: { type: String },
      },
    ],
    workTime: [{ day: { type: Date }, time: { type: Date } }],
    deletedAt: { type: Date, default: null },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', User);
