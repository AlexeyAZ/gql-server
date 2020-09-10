const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const isPlainObject = require('lodash/isPlainObject');

const config = require('../config');

const verify = (token, success) => jwt.verify(token, config.jwt.secret, (err, decoded) => {
  if (err) {
    console.log(err)
    throw new AuthenticationError('Authentication error');
  } else {
    if (isPlainObject(decoded)) {
      return success(decoded)
    }
    throw new AuthenticationError('Authentication error');
  }
})

module.exports = { verify }