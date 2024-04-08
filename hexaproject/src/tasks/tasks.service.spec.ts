// src/tasks/tasks.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';

describe('TasksService', () => {
  let service: TasksService;
  let mockTaskModel;

  beforeEach(async () => {
    mockTaskModel = {
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      deleteMany: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getModelToken(Task.name), useValue: mockTaskModel },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const date = new Date();
    const task = new Task();
    task.title = 'Test Task';
    task.date = date;

    mockTaskModel.save = jest.fn().mockResolvedValue(task);
    const result = await service.create(task.title, task.date);

    expect(result).toEqual(task);
    expect(mockTaskModel.save).toHaveBeenCalled();
  });

  it('should find all tasks', async () => {
    const task = new Task();
    task.title = 'Test Task';
    task.date = new Date();

    mockTaskModel.find.mockResolvedValue([task]);
    const result = await service.findAll();

    expect(result).toEqual([task]);
    expect(mockTaskModel.find).toHaveBeenCalled();
  });
});