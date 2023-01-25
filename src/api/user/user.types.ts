import { ObjectId } from "mongoose";

export type UserProfileType = {
  id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
}
