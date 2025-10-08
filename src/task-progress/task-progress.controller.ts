import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Patch,
} from '@nestjs/common';
import { TaskProgressService } from './task-progress.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskProgressDto } from 'src/common/dto/create-task-progress.dto';
import { UpdateTaskProgressDto } from 'src/common/dto/update-task-progress.dto';
import { TaskProgress } from 'src/common/schemas/task-progress.schema';

@Controller('task-progress')
@UseGuards(JwtAuthGuard)
export class TaskProgressController {
    constructor(private readonly taskProgressService: TaskProgressService) { }

    @Post()
    create(@Body() createTaskDto: CreateTaskProgressDto) {
        console.log('Creating progress task', CreateTaskProgressDto);
        
        return this.taskProgressService.create(createTaskDto);
    }

    @Get(':userId')
    findAll(@Param('userId') userId: string): Promise<TaskProgress[]> {
        console.log('getting all progress for userID', userId);
        
        if (userId) {
            return this.taskProgressService.findByUser(userId);
        }
        return this.taskProgressService.findAll();
    }

    @Get('/task/:userId/:taskId')
    findOne(
        @Param('taskId') taskId: string,
        @Param('userId') userId: string,
    ): Promise<TaskProgress> {
        console.log('Getting progress for task id:', taskId, 'user:', userId);
        
        return this.taskProgressService.findOne(userId, taskId);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTaskProgressDto: UpdateTaskProgressDto,
    ) {
        console.log(`Patching TaskProgress with ID: ${id}`);
        
        return this.taskProgressService.update(id, updateTaskProgressDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.taskProgressService.remove(id);
    }

    @Post(':id/complete')
    completeTask(@Param('id') id: string) {
        return this.taskProgressService.completeTask(id);
    }

    @Post(':id/start')
    startTask(@Param('id') id: string) {
        return this.taskProgressService.startTask(id);
    }

    @Post(':id/stop')
    stopTask(@Param('id') id: string) {
        return this.taskProgressService.stopTask(id);
    }
}
