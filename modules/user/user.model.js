const { Schema, model }  = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../../config');

const userSchema = new Schema({
  firstName: String,
  lastName: { type: String },
  password: { type: String },
  email: {
    type: String,
    // unique: true
  },
});

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this.generateHash(this.password)
  }
  return next();
});

userSchema.methods = {
  generateHash(password) {
    return bcrypt.hashSync(password, 10);
  },
  authenticateUser(password) {
    return bcrypt.compareSync(password, this.password);
  },
  createToken() {
    const jwtOptions = {
      expiresIn: '2h'
    };
    return jwt.sign(
      {
        firstName: this.firstName,
        password: this.password,
        _id: this._id,
      },
      config.jwt.secret,
      jwtOptions,
    );
  },
  toAuthJSON() {
    return {
      _id: this._id,
      firstName: this.firstName,
      token: `Bearer ${this.createToken()}`,
    };
  },
  toJSON() {
    return {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    };
  },
};

const User = model('user', userSchema);

module.exports = User;