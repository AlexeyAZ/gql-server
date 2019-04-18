const User = require('./user.model.js');
const Post = require('../post/post.model.js');

const { verify } = require('../../jwt');

const resolvers = {
  Query: {
    getAllUsers: (parent, { _id }, context) => {
      return verify(context.token, success => {
        return User.find({})
      })
    },
    getAllUserPosts: (parent, { _id }) => {
      return Post.find({author: _id})
        .exec()
        .then(data => data)
    },
    getUser: (parent, { _id }, context) => {
      return verify(context.token, success => {
        return User.findById(_id).exec()
          .then(result => result)
          .catch(error => console.log(error))
      })
    },
    loginUser: (parent, user, context) => {
      console.log(user)
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
      })
        // TODO add error handlers
        .then(user => {
          return user.toAuthJSON()
        });
    }
  }
};

module.exports = resolvers;