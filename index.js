const express = require('express')
const app = express()
const User = require("./models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const connectDatabase = require("./database")
const bodyParser = require('body-parser');
connectDatabase();
app.use(express.json());
app.use(cors());
console.log("hello");
const dotenv = require("dotenv");
dotenv.config();
app.get('/', (req, res) => {
  res.send('hello world')
})

app.post("/krisna/login", async (req, res, next) => {
    let { email, password } = req.body;
    // username = username.trim();
    // password = password.trim();
   try {
     const user = await User.findOne({ email });
     if (!user) {
       return next(new ApiError("Username not registered", 404));
     }
 
     const match = await bcrypt.compare(password, user.password);
     if (!match) return next(new ApiError("Incorrect password", 400));
 
     const payload = {
       _id: user._id,
       email: user.email,
       name: user.name,

     };
 
     const accessToken = jwt.sign(payload, process.env.JWT_SECRET || "aaaaaa",);
    //  res.cookie("refreshToken", refreshToken);
     res.status(200).json({
       status: "Success",
       message: "Login successful",
       data : {
           accessToken
       },
     });
   } catch (error) {
    res.status(500).json({
        error : error,
      })
      console.log(error);
   }
})
app.post("/krisna/register", async (req, res) => {
    let { email, password, name } = req.body;
    try {
      let existingUser = await User.findOne({ name });
      if (existingUser) {
        return next(new ApiError("User already exists", 400));
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        email,
        password: hashedPassword,
        name,
      });
  
      await newUser.save();
  
      res.status(201).json({
        status: "Success",
        message: "User created successfully",
        data: {
          _id: newUser._id,
          email: newUser.email,
          name: newUser.name,
        },
      });
    } catch (error) {
      res.status(500).json({
        error : error,
      })
      console.log(error);
    }
  
})

app.listen(8000)