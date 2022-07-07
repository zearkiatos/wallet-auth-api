import { Request, Response } from "express";
import { route, POST } from "awilix-express";
import { StatusCodes } from "http-status-codes";
import UserService from "../services/UserService";
import BaseController from "../common/controllers/BaseController";
import { UserCreateDTO } from "../DTOs/User";

@route("/identity")
class IdentityController extends BaseController {
  constructor(readonly userService: UserService) {
    super();
  }

  @route("/authenticate")
  @POST()
  async authenticate(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const token = await this.userService.authenticate(
        email,
        password
      );
      response.status(StatusCodes.OK);
      response.send({
        token
      });
    } catch (ex) {
      this.handleException(ex, response);
    }
  }

  @route("/create")
  @POST()
  async create(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      await this.userService.create({
        email,
        password,
      } as UserCreateDTO);
      response.status(StatusCodes.CREATED);
      response.send();
    } catch (ex) {
      this.handleException(ex, response);
    }
  }
}

export default IdentityController;
