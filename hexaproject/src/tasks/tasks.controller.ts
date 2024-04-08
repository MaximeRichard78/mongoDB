// src/tasks/tasks.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put, Query, BadRequestException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body('title') title: string, @Body('date') date: Date): Promise<Task> {
    const currentDate = new Date();
    if (date < currentDate) {
      throw new BadRequestException('Date non valide. Veuillez entrer une date future.');
    }
    return this.tasksService.create(title, date);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body('title') title: string, @Body('date') date: Date): Promise<Task> {
    const currentDate = new Date();
    if (date < currentDate) {
      throw new BadRequestException('Date non valide. Veuillez entrer une date future.');
    }
    return this.tasksService.update(id, title, date);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Task> {
    return this.tasksService.delete(id);
  }

  @Get('search')
  async find(@Query('title') title: string, @Query('date') date: Date): Promise<Task[]> {
    return this.tasksService.find(title, date);
  }
}