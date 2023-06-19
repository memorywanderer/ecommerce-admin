import bcrypt from 'bcrypt';
import User from '../../models/user';
import { connectDB } from '../../utils/connectMongo';
import { errorHandler, responseHandler, validateAllOnce } from '../../utils/common';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    errorHandler("Invalid req type", res);
  } else {
    try {
      const { email, password } = req.body;
      console.log(req.body)
      validateAllOnce(req.body);

      // create DB connection
      await connectDB();

      const existingUser = await User.findOne({ email })
      if (existingUser) {
        errorHandler("User already exists", res);
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = User.create({
        ...req.body,
        password: hashedPassword
      });
      console.log('user', user)

      if (user) {
        const userDoc = user._doc;
        delete userDoc.password;
        responseHandler(userDoc, res, 201);
      } else {
        errorHandler('Something went wrong', res);
      }
    } catch (error) {
      errorHandler(error, res);
    }
  }
}
