import User from "./domain/User";

interface UserRepository {
  findByEmailAndPassword(email: string, password: string): Promise<User | null>;
  store(entry: User): Promise<void>;
}

export default UserRepository;
