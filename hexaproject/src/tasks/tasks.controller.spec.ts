// src/tasks/tasks.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    service = { create: jest.fn(), findAll: jest.fn(), findOne: jest.fn(), update: jest.fn(), delete: jest.fn() } as any;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: service }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task', async () => {
    const date = new Date();
    const task = new Task();
    task.title = 'Test Task';
    task.date = date;

    (service.create as jest.Mock).mockResolvedValue(task);
    const result = await controller.create(task.title, task.date);

    expect(result).toEqual(task);
    expect(service.create).toHaveBeenCalledWith(task.title, task.date);
  });

  it('should find all tasks', async () => {
    const task = new Task();
    task.title = 'Test Task';
    task.date = new Date();

    (service.findAll as jest.Mock).mockResolvedValue([task]);
    const result = await controller.findAll();

    expect(result).toEqual([task]);
    expect(service.findAll).toHaveBeenCalled();
  });
});