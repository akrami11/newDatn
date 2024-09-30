const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LightNovel = new Schema(
  {
    ID: { type: String, maxLength: 20 },
    LID: { type: String, maxLength: 20 },
    AuthorID: { type: String, maxLength: 20 },
    volume: { type: String, maxLength: 20 },
    chapter: { type: String },

    file: { type: String },
    name: { type: String },

    image: { type: String },
    views: { type: Number, defaultValue: 0 },
    lock: { type: Boolean },
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

module.exports = mongoose.model('LightNovel', LightNovel);
