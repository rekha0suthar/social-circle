import User from '../model/User.js';
import jwt from 'jsonwebtoken';

/// signup controller
const signup = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const existUser = await User.findOne({ username });
    if (existUser) {
      return res.status(401).json({ msg: 'User already exists' });
    }

    const newUser = await new User({
      name,
      username,
      password,
    }).save();

    res.status(201).json({ msg: 'Signup successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/// login controller
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const existsUser = await user.checkPassword(password);

    if (!existsUser) {
      return res.status(401).json({ msg: 'Invalid username or password' });
    }

    await user.updateLoggedIn();

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    res.status(200).json({ msg: 'Login successfully', token, user });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export { signup, login };
