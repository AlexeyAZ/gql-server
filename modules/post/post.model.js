const { Schema, model }  = require('mongoose');

const postSchema = new Schema({
  title: String,
  content: String,
  createdAt: String,
  updatedAt: String,
  author: { type: Schema.Types.ObjectId, ref: 'user' },
});

const Post = model('post', postSchema);

module.exports = Post;