import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/created-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ){}

  // all(): Task[] {
  //   return this.tasks;
  // }

  // allFilter(filterDto: GetTaskFilterDto): Task[] {
  //   const {status, search} = filterDto;

  //   let tasks = this.all();

  //   if (status){
  //     tasks = tasks.filter(task => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter(task => 
  //       task.title.includes(search) ||
  //       task.description.includes(search)
  //     );
  //   }

  //   return tasks;
  // }

  // getOne(id: string): Task {
  //   const found =  this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Task whit this ${id} not found`);
  //   }

  //   return found;
  // }

  // create(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }

  // delete(id: string): void{
  //   const found = this.getOne(id);
  //   this.tasks = this.tasks.filter(task => task.id !== found.id)
  // }

  // updatePath(id: string, status: TaskStatus): Task{
  //   const task = this.getOne(id);
  //   task.status = status;
  //   return task;
  // }

  async getTaskById(id: number): Promise<Task>{
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task whit this ${id} not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: number): Promise<any>{
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task whit this ID ${id} not found`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task>{
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>{
    return await this.taskRepository.getTasks(filterDto);
  }
}
