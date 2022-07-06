import SHA from "sha.js";
import { UserCreateDTO } from "../DTOs/User";
import UserRepository from "../repositories/UserRepository";

class UserService {
constructor(
    private readonly userRepository: UserRepository
  ) {}
  public async create(user: UserCreateDTO): Promise<void> {
    user.password = SHA("sha256").update(user.password).digest("base64");

    await this.userRepository.store(user);
  }
}

export default UserService;
