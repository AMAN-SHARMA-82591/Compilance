const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.set("autoCreate", false);  // It will not create a collection unless and until there's data init.
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
