const app = require("./index");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const port = 5000;


mongoose
.connect("mongodb+srv://setiawankrisna321:gM5UxUgtdpu4uX3a@cluster0.zccs2wk.mongodb.net/")
.then(() => {
    console.log("Database Berhasil Terkoneksi");
  });

app.listen(port, () => {
  console.log(`App Running on ${port}`);
});