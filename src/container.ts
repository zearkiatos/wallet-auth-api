import { Application } from "express";
import { createContainer, asClass } from "awilix";
import { scopePerRequest } from "awilix-express";
import UserMySQLRepository from "./repositories/implementation/mysql/UserMySQLRepository";
import UserService from "./services/UserService";

const Container = (app: Application) => {
  const container = createContainer({
    injectionMode: "CLASSIC",
  });

  container.register({
    userRepository: asClass(UserMySQLRepository).scoped(),
    userService: asClass(UserService).scoped(),
  });

  app.use(scopePerRequest(container));
};

export default Container;
