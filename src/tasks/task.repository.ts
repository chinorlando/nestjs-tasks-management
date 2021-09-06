import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/created-task.dto";
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>{
    const {status, search} = filterDto;
    const query = this.createQueryBuilder('tasks');

    if (status) {
      query.andWhere('tasks.status = :status', {status});
    }

    if (search) {
      query.andWhere('(tasks.title LIKE :search OR tasks.description LIKE :search)', {search: `%${search}%`});
    }

    const tasks = await query.getMany();
    return tasks;
  }


  async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
    const { title, description } = createTaskDto;
    const task = new Task()

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    
    await task.save();
    return task;
  }
}
