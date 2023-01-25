import Favs from "./favs.model";

export function getAllFavs() {
  return Favs.find().sort({ createdAt: -1 });
};
