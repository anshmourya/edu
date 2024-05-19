import mongoose from 'mongoose';

const newUser = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  applied_to: {
    type: String,
    default: 'others',
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', newUser);

export default User;
