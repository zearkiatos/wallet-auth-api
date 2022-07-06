import connection from "../../../persistence/MySqlPersistence";
import User from "../../domain/User";
import UserRepository from "../../UserRepository";
import { userMapper } from "../Adapter/UserAdapter";

class UserMySQLRepository implements UserRepository {
  public async findByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | null> {
    const [rows]: any[] = await connection.execute(
      `SELECT * FROM auth_user WHERE email = ${email} AND password=${password}`
    );

    if (rows.length) return userMapper(rows[0]);

    return null;
  }
  public async store(entry: User): Promise<void> {
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    await connection.execute(
      `INSERT INTO auth_user(email, password, created_at, updated_at) VALUES('${entry.email}','${entry.password}', '${now}', '${now}')`
    );
  }
}

export default UserMySQLRepository;
