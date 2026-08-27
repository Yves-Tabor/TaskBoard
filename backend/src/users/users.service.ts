import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async create(fullName: string, email: string, password: string) {
  const user = new this.userModel({
    fullName,
    email,
    password,
  });

  user.save();
    return {
    message: 'User registered successfully',
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
          },
        };
  }
}