import { DocumentDefinition } from "mongoose";
import Lists, { ListsDocument } from "./lists.model";

export function getAllLists(id: string) {
  const filter = { 'createdBy': id };
  return Lists.find(filter).sort({ name: 1 }).populate({ path: 'createdBy' });
};

export function getListsById(id: string) {
  return Lists.findById(id);
};

export function postCreateLists(
  input: DocumentDefinition<Omit<ListsDocument, 'createdAt' | 'updateAt'>>
) {
  return Lists.create(input);
}
