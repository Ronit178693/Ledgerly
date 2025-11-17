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
  phoneNumber: {
    type: String,
    required: [true, 'Please provide a phone number'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
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
});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    return next(); // Prevents re-hashing if password is not modified
  }
  else{
    const salt = 10;
    this.password = await bcrypt.hash(this.password, salt)
  }
});

userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password);
}
const User = mongoose.model('User', userSchema);

export default User;
