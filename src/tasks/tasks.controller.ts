import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/created-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
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

  // @Get(':id')
  // getOne(@Param('id') id: string): Task{
  //   return this.tasksService.getOne(id);
  // }

  // @UsePipes(ValidationPipe)
  // @Post()
  // create(@Body() createTasksDto: CreateTaskDto){
  //   return this.tasksService.create(createTasksDto);
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
}
