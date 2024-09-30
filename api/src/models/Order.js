const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
  {
    UID: { type: String, maxLength: 20 },
    CID: { type: String, maxLength: 20 },
    items: [
      {
        PID: { type: String, maxLength: 20 },
        quantity: { type: Number },
        price: { type: String },
      },
    ],
    confirmDate: { type: Date },
    deliveryDate: { type: Date },
    total: { type: Number },
    deletedAt: { type: Date, default: null },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', Order);
