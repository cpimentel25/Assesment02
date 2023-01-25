import { Document, Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import { UserProfileType } from "./user.types";

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string; // hash -> SH256
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updateAt?: Date;

  profile: UserProfileType;
  comparePassword: (password: string) => Promise<boolean>;
};

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide a first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a last name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  }
}, {
  timestamps: true,
  versionKey: false,
});

// 1. Encript PASSWORD
//bcrypt ->
async function save(this: UserDocument, next: Function) {
  const user = this as UserDocument;

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;

  } catch (error) {
    next(error);
  }
};

// 2. Middleware mongoose -> .pre('save');
// Middlewares
UserSchema.pre('save', save);
UserSchema.pre('update', save);

// 3. Compared PASSWORD witch HASH
// Methods
async function comparePassword(this: UserDocument, candidatePassword: string, next: Function) {
  const user = this;

  try {
    const isMatch = await bcrypt.compare(candidatePassword, user.password);
    return isMatch;
  } catch (error) {
    next(error);
    return false;
  };
};

// 4. Mongoose -> comparePassword
UserSchema.methods.comparePassword = comparePassword;

// Virtuals
UserSchema.virtual('fullname').get(function fullname(this: UserDocument) {
  const { firstName, lastName } = this;
  return `${firstName} ${lastName}`;
});

UserSchema.virtual('profile').get(function profile(this: UserDocument) {
  const { id, firstName, lastName, email, createdAt } = this;
  return {
    id,
    firstName,
    lastName,
    email,
    createdAt
  }
});

const User = model<UserDocument>('User', UserSchema);

export default User;
