import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false
  },
    createdAt: {
    type: Date,
    default: Date.now
  },
},{
  timestamps: true,
});


export const hashPassword = async (password) => {
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);
return hash;
}
const User = mongoose.model('User', userSchema);

export default User;
