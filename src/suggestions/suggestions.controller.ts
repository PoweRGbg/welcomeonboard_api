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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateTaskSuggestionDto } from 'src/common/dto/update-task-suggestion.dto';
import { CreateTaskSuggestionDto } from 'src/common/dto/create-task-suggestion.dto';

@Controller('task-suggestions')
@UseGuards(JwtAuthGuard)
export class SuggestionsController {
    constructor(private readonly taskService: SuggestionsService) { }

    @Post()
    create(@Body() createTaskDto: CreateTaskSuggestionDto) {
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
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskSuggestionDto) {
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
