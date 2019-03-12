const Post = require('./post.model.js');
const User = require('../user/user.model');

const resolvers = {
  Query: {
    getAllPosts: () => Post.find({}),
  },
  Mutation: {
    addPost: (parent, post) => {
      return User.findById(post.userId).exec()
        .then(author => {
          // TODO add error handlers
          const newPost = new Post({ title: post.title, content: post.content, author })
          newPost.save()
          return newPost
        })
    }
  }
};

module.exports = resolvers;