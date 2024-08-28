const mongoose = require("mongoose");

const URI_DB = "mongodb://127.0.0.1/storeZootopia";

async function connectDB() {
  await mongoose.connect(URI_DB);
}

const connectDatabase = function () {
  connectDB()
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  connectDatabase,
  mongoose 
};


