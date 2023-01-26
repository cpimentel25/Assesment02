import { DocumentDefinition } from "mongoose";
import Favs, { FavsDocument } from "./favs.model";

export function getAllFavs() {
  return Favs.find().sort({ createdAt: -1 });
};


export function getFavs(id: string) {
  return Favs.findById(id)
    .populate({ path: 'createdBy', select: 'firstName lastName' });
};

export function createFavs(
  data: DocumentDefinition<Omit<FavsDocument, 'createdAt' | 'updateAt'>>
) {
  return Favs.create(data)
};

export function deleteFavs(id: string) {
  return Favs.findByIdAndDelete(id)
};
