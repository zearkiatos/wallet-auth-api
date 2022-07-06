import SHA from "sha.js";
import jwt from "jsonwebtoken";
import config from "../config/";
import { UserCreateDTO } from "../DTOs/User";
import User from "../repositories/domain/User";
import UserRepository from "../repositories/UserRepository";
import ApplicationException from "../common/Exceptions/ApplicationException";

class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async authenticate(email: string, password: string): Promise<string> {
    const passwordCiphered = SHA("sha256").update(password).digest("base64");

    const user: User = await this.userRepository.findByEmailAndPassword(
      email,
      password
    );

    if (config.JWT_SECRET_KEY) {
      const secretKey = config.JWT_SECRET_KEY;

      if (user) {
        return jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          secretKey,
          {
            expiresIn: "7h",
          }
        );
      } else {
        throw new ApplicationException("Invalid user credentials supplied");
      }
    } else {
      throw new Error("Secret key is not defined");
    }
  }

  public async create(user: UserCreateDTO): Promise<void> {
    user.password = SHA("sha256").update(user.password).digest("base64");

    await this.userRepository.store(user);
  }
}

export default UserService;
