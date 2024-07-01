const express = require('express');
const app = express();
const User = require("./models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const connectDatabase = require("./database");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();

connectDatabase();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Define a router
const router = express.Router();

// Root route
router.get('/', (req, res) => {
  res.send('hello world');
});

// Login route
router.post("/krisna/login", async (req, res, next) => {
  let { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Username not registered" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Incorrect password" });

    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET || "aaaaaa");

    res.status(200).json({
      status: "Success",
      message: "Login successful",
      data: {
        accessToken
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

// Register route
router.post("/krisna/register", async (req, res, next) => {
  let { email, password, name } = req.body;

  try {
    let existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
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
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});


// Use the router
app.use('/', router);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
