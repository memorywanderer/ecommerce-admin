import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please, add your first name']
  },
  lastName: {
    type: String,
    // required: [true, 'Please, add your last name']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please, add your email']
  },
  phoneNumber: {
    type: String,
    // required: [true, 'Please, add your phone number'],
    // match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
  },
  password: {
    type: String,
    required: [true, 'Please, add your password']
  },
  role: {
    type: String,
    enum: ['admin', 'stuff', 'customer'],
    default: 'customer',
    // required: [true, 'Please, add a role']
  }
})

export default mongoose.models.User || mongoose.model('User', userSchema)