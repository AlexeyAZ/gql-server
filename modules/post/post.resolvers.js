const moment = require('moment');
const Post = require('./post.model.js');
const User = require('../user/user.model');

const resolvers = {
  Query: {
    getAllPosts: () => Post.find({}),
  },
  Mutation: {
    createPost: (parent, {title, content, userId}) => {
      const createdAt = String(+moment())
      return User.findById(userId)
        .exec()
        .then(author => {
          // TODO add error handlers
          const newPost = new Post({ title: title, content: content, createdAt, updatedAt: createdAt, author: author._id })
          return newPost.save()
            .then(post => {
              author.posts.push(post)
              return author.save()
                .then(() => {
                  return post
                })
            })
        })
    },
    updatePost: (parent, {title, content, postId}) => {
      const updatedAt = String(+moment())
      return Post.findByIdAndUpdate(postId, {title, content, updatedAt}, {new: true})
        .exec()
        .then(post => post)
    }
  }
};

module.exports = resolvers;