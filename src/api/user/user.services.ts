import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from "./user.model";

export function getAllUsers() {
  return User.find({}, { password: 0 }).sort({ createdAt: -1 });
};

export function getUser(filter: FilterQuery<UserDocument>) {
  const user = User.findOne(filter);
  return user;
};

export function createUser(
  input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updateAt'>>
) {
  return User.create(input);
};
