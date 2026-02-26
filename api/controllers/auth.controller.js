import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  // console.log(req.body);
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    // console.error('Error creating user:', err);
    // return res.status(500).json({ message: err.message });

    next(err);

    // next(errorHandler(550, 'Error creating user'));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found!'));
      // return res.status(404).json({ message: 'User not found!' });
    }
    const isPasswordValid = bcryptjs.compareSync(password, validUser.password);
    if (!isPasswordValid) {
      return next(errorHandler(401, 'Invalid password!'));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    // exclude password from response
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, {
        httpOnly: true,
        expire: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
