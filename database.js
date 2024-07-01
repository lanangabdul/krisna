const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb+srv://setiawankrisna321:gM5UxUgtdpu4uX3a@cluster0.zccs2wk.mongodb.net/")
    .then((data) => {
      console.log("DB Connection");
    });
};

module.exports = connectDatabase;