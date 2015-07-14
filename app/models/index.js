var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
               process.env.MONGOHQ_URL ||
               "mongodb://localhost/pdgui");

module.exports.mongoose = mongoose;
module.exports.User = require("./user");
