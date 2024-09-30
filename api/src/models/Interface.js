const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Interface = new Schema(
  {
    ID: { type: Number, unique: true, maxLength: 20 },
    name: { type: String, maxLength: 254 },
    title: { type: String, maxLength: 254 },
    to: { type: String },
    image: { type: String },
    children: { type: Array },
    type: { type: String },
    icon: { type: String },
    showTime: { type: Date },
    level: { type: String, maxLength: 2 },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Interface', Interface);
