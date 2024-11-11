import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLoggedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.checkPassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password);
    return match;
  } catch (err) {
    console.error(err);
    return false;
  }
};

userSchema.methods.updateLoggedIn = function () {
  return this.model('User').findOneAndUpdate(
    {
      username: this.username,
    },
    {
      lastLoggedAt: new Date(),
    }
  );
};

const User = model('User', userSchema);

export default User;
