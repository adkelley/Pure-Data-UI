var exports = module.exports = {};

exports.validateEmail = function (email) {
  // http://stackoverflow.com/a/46181/11236
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

exports.validatePassword = function (password, confirmation) {
  return (password.length >= 6 && confirmation.length >= 6)

}


