import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt, { hashSync } from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/tokenGenerator.js";

// @desc    Register user
// @route   POST /api/users
// access   Public
const registerUser = asyncHandler(async (req, res, next) => {
    // Check if body is filled in
    try {
        const body = req.body;
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }

    // Check required fields
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }
    // Check user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("Email has already been registered");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc    Login
// @route   POST /api/users/login
// access   Public
const loginUser = asyncHandler(async (req, res, next) => {
    // Check if body is filled in
    try {
        const body = req.body;
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }

    // Check required fields
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill in login details");
    }

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201);
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
});

// @desc    Get user data display
// @route   GET /api/users/me
// access   Private
const getMe = asyncHandler(async (req, res, next) => {
    res.json("User data display");
});

export { registerUser, loginUser, getMe };
