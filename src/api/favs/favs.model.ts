import { Document, ObjectId, Schema, model } from "mongoose";

export interface FavsDocument extends Document {
  lists: string;
  title: string;
  description: string;
  link: string;
  createdBy: ObjectId;
  createdAt: Date;
  updateAt?: Date;
};

const FavsSchema = new Schema({
  lists: {
    type: String,
    ref: 'Lists'
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const Favs = model<FavsDocument>('Favs', FavsSchema);

export default Favs;
