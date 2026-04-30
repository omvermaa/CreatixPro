import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  company: string;
  email: string;
  phone: string;
  requirement: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    requirement: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
