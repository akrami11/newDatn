const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bill = new Schema(
  {
    UID: { type: String, maxLength: 20 },
    BID: { type: String, maxLength: 20 },
    CID: { type: String, maxLength: 20 },
    PRID: { type: String, maxLength: 20 },
    items: [
      {
        PID: { type: String, maxLength: 20 },
        quantity: { type: Number }, 
        price: { type: String },
      },
    ],
    type: { type: Boolean, defaultValue: 1 },
    deliveryDate: { type: Date },
    total: { type: Number },
    deletedAt: { type: Date, default: null },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bill', Bill);
