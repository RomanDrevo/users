import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export type User = {
  id: number;
  username: string;
  password: string;
};

const users: User[] = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

@Injectable()
export class UserService {
  private readonly users = users;

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ token: string } | null> {
    const user = this.findOne(username);
    if (user && (await user).password === password) {
      const payload = { username: username, sub: (await user).id };
      return {
        token: jwt.sign(payload, 'your-256-bit-secret', { expiresIn: '1h' }),
      };
    }
    return null;
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    console.log('--->>>here 1');
    return this.users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    });
  }
}
