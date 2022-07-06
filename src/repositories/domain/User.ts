interface User {
  id: number;
  email: string;
  password: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export default User;
