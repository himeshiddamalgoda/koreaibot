const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.schedule = require("./scheduleDemo.js")(mongoose);
db.quote= require("./requestQuote.js")(mongoose);
db.contactSales= require("./contactSales.js")(mongoose);
db.subscribeNews= require("./subNews.js")(mongoose);
// db.transaction = require("./transaction.model.js")(mongoose);
// db.user= require("./user.model.js")(mongoose);

module.exports = db;
