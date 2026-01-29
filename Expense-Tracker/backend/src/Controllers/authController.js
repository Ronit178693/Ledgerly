import User from '../Models/Users.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { hashPassword } from '../Models/Users.js';
import bcrypt from 'bcrypt';
dotenv.config();


export const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        else {
            const newUser = await User.create({
                name,
                email,
                password: await hashPassword(password)
            });
            await newUser.save();
            const token = jwt.sign({ Id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                secure: process.env.NODE_ENV === 'production',
                //sameSite: 'strict'
            });
            // TODO: Consider removing token from body in future versions, as it is already set in cookie
            return res.status(201).json({ success: true, message: 'User created successfully', token })

        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: `Server Error: ${error.message}` });
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ Id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            secure: process.env.NODE_ENV === 'production',
            //sameSite: 'strict'
        });
        return res.status(200).json({ success: true, message: 'Logged in successfully', token });

    }
    catch (error) {
        res.status(500).json({ success: false, message: `Server Error: ${error.message}` });
    }
}


export const Logout = async (req, res) => {

    try {
        res.clearCookie('token');
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: `Server Error: ${error.message}` });
    }
}   