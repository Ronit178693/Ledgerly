import Users from '../Models/Users.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const checker = async (req, res, next) =>{
    
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
          // Get token from header
          let token = req.headers.authorization.split(' ')[1];
    
          // Verify token
          const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
          // Get user from the token
          req.user = await Users.findById(decoded.id).select('-password');
          if(!req.user){
            return res.status(401).json({ message: 'Not authorized, user not found' });
          }
    
          next();
        } catch (error) {
          res.status(401).json({ message: 'Not authorized, token failed' });
        }
      }
    
      if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
      }
}