var mongoose = require("mongoose"),
    bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    index: {
      unique: true
    }
  },
  passwordDigest: {
    type: String,
    required: true
  },
  patches: []
  
});

var confirm = function(password, passwordCon) {
  return password = passwordCon;
};

userSchema.statics.createSecure = function (params, cb) {

  var isConfirmed = confirm(params.password, params.password_confirmation);

  if (!isConfirmed) {
    return cb("Passwords Should Match", null);
  }

  var that = this;
  bcrypt.hash(params.password, 12, function (err, hash) {
    params.passwordDigest = hash;
    that.create(params, cb);
  });
};

userSchema.methods.checkPassword = function (password, cb) {
  var user = this;
  console.log("checkPassword()", user);
  bcrypt.compare(password,
                 user.passwordDigest, function (err, isMatch) {
                   if (isMatch) {
                     cb(null, user);
                   } else {
                     cb("Error", null);
                   }
                 });
};

userSchema.statics.authenticate = function (params, cb) {
  console.log("authenticate()", params);
  this.findOne({
    email: params.email
    },
    function (err, user) {
      //console.log("Error: ", err, "User: ", user);
      if (user) {
        user.checkPassword(params.password, cb);
      } else {
        cb("Error", null);
      }
    });
};

var User = mongoose.model("User", userSchema);

module.exports = User;

