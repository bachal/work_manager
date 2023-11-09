import mongoose from 'mongoose';
const { Schema } = mongoose;

const usersSchema = new Schema({
  firstName: { type: String, required: true },
  lastname: { type: String, required: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  created: { type: Date, default: Date.now, required: true }
});

export const users = mongoose.models.users || mongoose.model('users', usersSchema)