import { Document, ObjectId, Schema, model } from "mongoose";

export interface ListsDocument extends Document {
  name: string;
  createdBy: ObjectId;
  createdAt: Date;
  updateAt?: Date;
};

const ListsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true,
  versionKey: false,
});

// Virtuals
ListsSchema.virtual('Lists').get(function lists(this: ListsDocument) {
  const { name } = this;
  return {
    name,
  };
});

const Lists = model<ListsDocument>('Lists', ListsSchema);

export default Lists;
