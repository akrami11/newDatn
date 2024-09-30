const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    UID: { type: String, maxlength: 20 },
    LID: { type: String, maxLength: 20 },
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
  },

  { timestamps: true }
);

module.exports = mongoose.model('Comment', Comment);
