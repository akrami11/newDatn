const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    ID: { type: String, unique: true, maxLength: 20 },
    name: { type: String, maxLength: 254 },
    image: { type: String },
    description: { type: String, maxLength: 500 },
    tag: { type: String },
    price: { type: String },
    quantity: { type: String },
    sale: { type: String },
    PRID: { type: String, maxLength: 20 },
    AuthorID: { type: String, maxLength: 20 },
    LID: { type: String, maxLength: 20 },
    views: { type: Number, defaultValue: 0 },
    series: { type: String },
    hide: { type: Number },
    comment: [
      {
        UID: { type: String, maxlength: 20 },
        username: { type: String },
        content: { type: String, maxlength: 500 },
        chapter: { type: String },
        image: { type: String },
        liked: [{ uid: { type: String } }],
        disliked: [{ uid: { type: String } }],
        replyName: { type: String },
        child: [
          {
            UID: { type: String, maxlength: 20 },
            username: { type: String },
            content: { type: String, maxlength: 500 },
            replyName: { type: String },
            chapter: { type: String },
            image: { type: String },
            liked: [{ uid: { type: String } }],
            disliked: [{ uid: { type: String } }],
            deletedAt: { type: Date },
            createdAt: { type: Date },
          },
        ],
        deletedAt: { type: Date },
        createdAt: { type: Date },
      },
    ],
    deletedAt: { type: Date, default: null },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', Product);
