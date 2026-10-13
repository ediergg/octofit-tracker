import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, trim: true },
    name: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    passwordHash: { type: String },
  },
  { timestamps: true, collection: 'users' },
);

export default model('User', userSchema);
