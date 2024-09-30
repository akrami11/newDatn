const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Productor = new Schema(
  {
    ID: { type: String, unique: true, maxLength: 20 },
    name: { type: String, maxLength: 254 },
    address: { type: String, maxLength: 254 },
    phone: { type: String, maxLength: 13 },
    email: { type: String, maxLength: 130 },
    deletedAt: { type: Date, default: null },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Productor', Productor);
