import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from '../common/dto/create-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { use } from 'passport';
import { getLoggerDate } from 'src/common/helpers';
import { UpdateTaskDto } from 'src/common/dto/update-task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        console.log(getLoggerDate(), 'Creating task', createTaskDto.name, 'from ', createTaskDto.createdBy);
        
        return this.taskService.create(createTaskDto);
    }

    @Get()
    findAll(@Query('userId') userId?: string, @Query('department') department?: string) {
        if (userId) {
            return this.taskService.findByUser(userId);
        }
        if (department) {
            return this.taskService.findByDepartment(department);
        }
        
        return this.taskService.findAll();
    }

    @Get('/names')
    findAllNames(): Promise<string[]> {
        return this.taskService.findAllNames();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.taskService.findOne(id);
    }

    @Patch(':id')
    findByIdAndUpdate(@Param('id') id: string, @Body() updatedTask: UpdateTaskDto) {
        return this.taskService.update(id, updatedTask);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.taskService.remove(id);
    }

    @Post(':id/complete')
    completeTask(@Param('id') id: string, @Body() body: { userId: string }) {
        return this.taskService.completeTask(id, body.userId);
    }
}
