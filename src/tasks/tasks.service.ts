import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/created-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  all(): Task[] {
    return this.tasks;
  }

  allFilter(filterDto: GetTaskFilterDto): Task[] {
    const {status, search} = filterDto;

    let tasks = this.all();

    if (status){
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(task => 
        task.title.includes(search) ||
        task.description.includes(search)
      );
    }

    return tasks;
  }

  getOne(id: string): Task {
    const found =  this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task whit this ${id} not found`);
    }

    return found;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  delete(id: string): void{
    const found = this.getOne(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id)
  }

  updatePath(id: string, status: TaskStatus): Task{
    const task = this.getOne(id);
    task.status = status;
    return task;
  }
}
