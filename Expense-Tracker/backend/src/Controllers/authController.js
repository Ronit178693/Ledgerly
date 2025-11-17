import User from '../Models/Users.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '30d'
  });
};

export const Signup = async (req, res) => {
    try{
        const {name, email, phoneNumber, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: 'User already exists'});
        }
        else{
            const newUser = await User.create({
                name,
                email,
                phoneNumber,
                password
            });
            const token = generateToken(newUser._id);
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber,
                token
            });
        }
    }
    catch(error){
        res.status(500).json({message: `Server Error: ${error.message}`});
    }
}

export const Login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email}).select('+password');
        if(!user){
            res.status(400).json({message: 'Invalid email or password'});
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            res.status(400).json({message: 'Invalid email or password'});
        }

        const token = generateToken(user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token
        });
    }
    catch(error){
        res.status(500).json({message: `Server Error: ${error.message}`});
    }
}