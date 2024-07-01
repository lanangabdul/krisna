const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const User = require("../models/user_model");

const login = async (req, res, next) => {
    try {
        let { email, password } = req.body;
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
        next(new ApiError(error.message))
    }
}

const register = async(req,res,next) =>{
    try {
        let { email, password, name } = req.body;
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
        next(new ApiError(error.message))
    }
}

module.exports = {
    login,
    register
}