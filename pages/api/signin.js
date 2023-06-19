import bcrypt from 'bcrypt';
import User from '../../models/user';
import { connectDB } from '../../utils/connectMongo';
import { errorHandler, validateAllOnce } from '../../utils/common';
import { generateToken } from '../../utils/jwt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    errorHandler("Invalid req type", res);
  } else {
    try {
      const { email, password } = req.body;
      validateAllOnce(req.body);

      await connectDB();
      // Find the user by the provided email in your MongoDB database
      const user = await User.findOne({ email }).lean();

      if (!user) {
        throw new Error("User doesn't exist");
      }

      const isMatched = await bcrypt.compare(password, user.password);

      if (user && isMatched) {
        const token = generateToken(user._id);
        const { password, ...userWithoutPassword } = user
        res.status(200).json({ ...userWithoutPassword, token });
      } else {
        // If the user is not found or the password doesn't match, return an error
        res.status(400).json("Email or Password Incorrect..!");
        throw new Error("Email or Password Incorrect..!");
      }
    } catch (error) {
      errorHandler("Login error", res, error);
    }
  }
}
