const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const router = require("./routers")
const ApiError = require('./utils/ApiError');
const errorHendler = require("./controllers/ErrorControllers");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(router);


app.all("*", (req, res, next) => {
    next(new ApiError(`Routes does not exist`, 404));
  });
  
app.use(errorHendler);
  
module.exports = app;