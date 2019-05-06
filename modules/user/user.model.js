const { Schema, model }  = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../../config');

const userSchema = new Schema({
  nickName: {
    type: String,
    unique: true
  },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
  },
  posts: [{type: Schema.Types.ObjectId, ref: 'post'}]
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
      expiresIn: '2h'// '5120'
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