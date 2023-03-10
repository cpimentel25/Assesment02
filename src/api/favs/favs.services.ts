import { DocumentDefinition } from "mongoose";
import Favs, { FavsDocument } from "./favs.model";
import Lists from "../lists/lists.model";

export function getAllFavs() {
  return Favs.find().sort({ createdAt: -1 });
};


export function getFavs(id: string) {
  return Favs.findById(id)
    .populate({ path: 'createdBy', select: 'firstName lastName' });
};

export function createFavs(
  data: DocumentDefinition<Omit<FavsDocument, 'createdAt' | 'updateAt'>>,
) {
  return Favs.create(data);
};

export function updateListsFavs(
  data: DocumentDefinition<Omit<FavsDocument, 'createdAt' | 'updateAt'>>,
  user: any
) {
  const query = {
    _id: data.lists,
    createdBy: user._id
  };

  const update = {
    $push: { favs: data }
  };

  return Lists.findOneAndUpdate(query, update);
};

export function deleteFavs(id: string) {
  return Favs.findByIdAndDelete(id)
};
