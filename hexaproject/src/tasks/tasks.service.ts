// src/tasks/tasks.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(title: string, date: Date): Promise<Task> {
    const now = new Date();
    if (date < now) {
      throw new BadRequestException('Date cannot be in the past');
    }

    const newTask = new this.taskModel({ title, date });
    return newTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().sort({ date: 1 }).exec();
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }
  async find(title?: string, date?: Date): Promise<Task[]> {
    const filter = {};
    if (title) {
      filter['title'] = title;
    }
    if (date) {
      filter['date'] = date;
    }
    return this.taskModel.find(filter).exec();
  }
  async update(id: string, title: string, date: Date): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, { title, date }, { new: true }).exec();
  }

  async delete(id: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
    if (!deletedTask) {
      throw new NotFoundException(`Task not found with id ${id}`);
    }
    return deletedTask;
  }

  async deleteOldTasks(): Promise<void> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    await this.taskModel.deleteMany({ date: { $lt: yesterday } }).exec();
  }
}