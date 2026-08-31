import { Injectable } from '@nestjs/common';

interface StoredUser {
  _id: string;
  fullName: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users = new Map<string, StoredUser>();

  async findByEmail(email: string) {
    const normalizedEmail = email.trim().toLowerCase();
    return [...this.users.values()].find((user) => user.email === normalizedEmail) ?? null;
  }

  async create(fullName: string, email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const user: StoredUser = {
      _id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      fullName,
      email: normalizedEmail,
      password,
    };

    this.users.set(user._id, user);
    return user;
  }
}