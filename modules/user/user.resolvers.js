const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const User = require('./user.model.js');
const config = require('../../config');

const resolvers = {
  Query: {
    getAllUsers: () => User.find({}),
    getUser: (parent, { _id }, context) => {
      return jwt.verify(context.token, config.jwt.secret, (err, decoded) => {
        if (err) {
          console.log(err)
          throw new AuthenticationError('Authentication error');
        } else {
          console.log(new Date(decoded.exp * 1000).toTimeString())
          if (_.isPlainObject(decoded)) {
            return User.findById(_id).exec()
              .then(result => result)
              .catch(error => console.log(error))
          }
          throw new AuthenticationError('Authentication error');
        }
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
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        email: user.email
      })
        // TODO add error handlers
        .then(user => {
          return user.toAuthJSON()
        });
    }
  }
};

module.exports = resolvers;