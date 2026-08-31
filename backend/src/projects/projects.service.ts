import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project, ProjectDocument } from './project.schema';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}

  async create(userId: string | Types.ObjectId, data: { name: string; description: string; font: string; bgColor: string }) {
    const userObjectId = typeof userId === 'string' ? new Types.ObjectId(userId) : userId;
    const project = new this.projectModel({
      ...data,
      userId: userObjectId,
      tasks: [],
    });
    return project.save();
  }

  async findByUserId(userId: string | Types.ObjectId) {
    const userObjectId = typeof userId === 'string' ? new Types.ObjectId(userId) : userId;
    return this.projectModel.find({ userId: userObjectId }).exec();
  }

  async findById(id: string) {
    return this.projectModel.findById(id).exec();
  }

  async update(id: string, data: Partial<{ name: string; description: string; font: string; bgColor: string }>) {
    return this.projectModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string) {
    return this.projectModel.findByIdAndDelete(id).exec();
  }

  async addTask(projectId: string, task: { id: string; title: string; description: string; status: string }) {
    return this.projectModel
      .findByIdAndUpdate(projectId, { $push: { tasks: task } }, { new: true })
      .exec();
  }

  async updateTask(projectId: string, taskId: string, data: Partial<{ title: string; description: string; status: string }>) {
    return this.projectModel
      .findByIdAndUpdate(
        projectId,
        { $set: { 'tasks.$[elem].title': data.title, 'tasks.$[elem].description': data.description, 'tasks.$[elem].status': data.status } },
        { arrayFilters: [{ 'elem.id': taskId }], new: true },
      )
      .exec();
  }

  async deleteTask(projectId: string, taskId: string) {
    return this.projectModel
      .findByIdAndUpdate(projectId, { $pull: { tasks: { id: taskId } } }, { new: true })
      .exec();
  }
}
