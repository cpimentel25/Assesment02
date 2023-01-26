import { Application } from "express";
import user from './api/user';
import lists from "./api/lists";
import favs from './api/favs';
import authLocal from './auth/local';

function routes(app: Application) {
  // Users ->
  app.use('/api/users', user);
  // Lists ->
  app.use('/api/lists', lists)
  // Favs ->
  app.use('/api/favs', favs);
  // Auth route ->
  app.use('/auth/local', authLocal);
  // Health check server ->
};

export default routes;
