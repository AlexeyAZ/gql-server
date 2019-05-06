const User = require('./user.model.js');
const Post = require('../post/post.model.js');

const { verify } = require('../../jwt');

const resolvers = {
  Query: {
    getAllUsers: (parent, { _id }, context) => {
      return verify(context.token, success => {
        return User.find({})
          .populate('posts')
          .exec()
          .then(posts => posts)
      })
    },
    getAllUserPosts: (parent, { _id }) => {
      return Post.find({authorId: _id})
        .exec()
        .then(data => data)
    },
    getUser: (parent, { _id }, context) => {
      return verify(context.token, success => {
        return User.findById(_id)
          .populate('posts')
          .exec()
          .then(result => result)
          .catch(error => console.log(error))
      })
    },
    loginUser: (parent, user, context) => {
      return User.findOne({ email: user.email })
        .exec()
        .then(findUser => {
          if(findUser.authenticateUser(user.password)) {
            return findUser.toAuthJSON()
          }
        })
    }
  },
  Mutation: {
    createUser: (parent, user) => {
      return User.create({
        nickName: user.nickName,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        email: user.email,
        role: 'User',
        posts: [],
      })
        // TODO add error handlers
        .then(user => {
          return user.toAuthJSON()
        });
    }
  }
};

module.exports = resolvers;