import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string) {
    const normalizedEmail = email.trim().toLowerCase();
    return this.userModel.findOne({ email: normalizedEmail }).exec();
  }

  async findById(id: string | Types.ObjectId) {
    return this.userModel.findById(id).exec();
  }

  async create(fullName: string, email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = new this.userModel({
      fullName,
      email: normalizedEmail,
      password,
    });
    return user.save();
  }
}