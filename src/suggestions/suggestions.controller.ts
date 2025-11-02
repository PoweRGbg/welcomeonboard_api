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
import { SuggestionsService } from './suggestions.service';
import { CreateTaskDto } from '../common/dto/create-task.dto';
import { UpdateTaskDto } from '../common/dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskSuggestionDto } from 'src/common/dto/create-task-suggestion.dto';

@Controller('task-suggestions')
@UseGuards(JwtAuthGuard)
export class SuggestionsController {
    constructor(private readonly taskService: SuggestionsService) { }

    @Post()
    create(@Body() createTaskDto: CreateTaskSuggestionDto) {
        console.log('Creating task suggestion', createTaskDto.name, 'from ', createTaskDto.suggestedBy);
        
        return this.taskService.create(createTaskDto);
    }

    @Get()
    findAll(@Query('userId') userId?: string, @Query('department') department?: string) {
        console.log('Find all suggestions called with userId:', userId, 'department:', department);
        if (userId) {
            return this.taskService.findByUser(userId);
        }
        if (department) {
            return this.taskService.findByDepartment(department);
        }
        console.log('Getting all suggestions in controller');
        
        return this.taskService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.taskService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(id, updateTaskDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.taskService.remove(id);
    }

    @Post(':id/complete')
    completeTask(@Param('id') id: string) {
        return this.taskService.completeTask(id);
    }
}
