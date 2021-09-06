import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/created-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // // @Get()
  // // all(): Task[] {
  // //   return this.tasksService.all();
  // // }

  // @Get()
  // allFilter(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.allFilter(filterDto);
  //   } else {
  //     return this.tasksService.all();
  //   }
    
  // }

  

  // @Delete(':id')
  // delete(@Param('id') id: string): void{
  //   this.tasksService.delete(id);
  // }

  // @Patch(':id/status')
  // update(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus
  // ): Task{
  //   return this.tasksService.updatePath(id, status);
  // }


  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTasksDto: CreateTaskDto): Promise<Task>{
    return this.tasksService.createTask(createTasksDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<any>{
    return this.tasksService.deleteTask(id);
  }
}
