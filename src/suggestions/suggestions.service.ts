import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateTaskDto } from '../common/dto/update-task.dto';
import { TaskSuggestion, TaskSuggestionDocument } from 'src/common/schemas/suggestion.schema';
import { CreateTaskSuggestionDto } from 'src/common/dto/create-task-suggestion.dto';
import { getLoggerDate } from 'src/common/helpers';

@Injectable()
export class SuggestionsService {
    constructor(@InjectModel(TaskSuggestion.name) private suggestionModel: Model<TaskSuggestionDocument>) { }

    async create(createTaskDto: CreateTaskSuggestionDto): Promise<TaskSuggestion> {
        // Generate unique IDs for actions
        if (createTaskDto.actions) {
            createTaskDto.actions = createTaskDto.actions.map(action => ({
                ...action,
                id: new Date().getTime().toString() + Math.random().toString(36).substr(2, 9),
            }));
        }

        const createdTaskSuggestion = new this.suggestionModel({
            ...createTaskDto,
            id: new Object
        });
        const result = createdTaskSuggestion.save();
        return result;
    }

    async findAll(): Promise<TaskSuggestion[]> {
        // return this.suggestionModel.find({}, { isInProgress: 0 }).populate('suggestedBy', 'username firstName lastName').exec();
        return this.suggestionModel.find({}, { isInProgress: 0 }).exec();
    }

    async findOne(id: string): Promise<TaskSuggestion> {
        const task = await this.suggestionModel
            .findById(id, { isInProgress: 0 })
            .populate('createdBy', 'username firstName lastName')
            .exec();

        if (!task) {
            throw new NotFoundException(`${getLoggerDate()} Task suggestionnot found`);
        }

        return task;
    }

    async findByUser(userId: string): Promise<TaskSuggestion[]> {
        return this.suggestionModel
            .find({ createdBy: userId }, { isInProgress: 0 })
            .populate('createdBy', 'username firstName lastName')
            .exec();
    }

    async findByDepartment(department: string): Promise<TaskSuggestion[]> {
        return this.suggestionModel
            .find({ department }, { isInProgress: 0 })
            .populate('createdBy', 'username firstName lastName')
            .exec();
    }

    async update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskSuggestion> {
        // Generate unique IDs for new actions
        if (updateTaskDto.actions) {
            updateTaskDto.actions = updateTaskDto.actions.map(action => ({
                ...action,
                id: action.id || new Date().getTime().toString() + Math.random().toString(36).substr(2, 9),
            }));
        }

        const updatedTaskSuggestion = await this.suggestionModel
            .findByIdAndUpdate(id, updateTaskDto, { new: true })
            .populate('suggestedBy', 'username firstName lastName')
            .exec();

        if (!updatedTaskSuggestion) {
            throw new NotFoundException(`${getLoggerDate()} Task suggestionnot found`);
        }

        return updatedTaskSuggestion;
    }

    async remove(id: string): Promise<{ deleted: boolean }> {
        const result = await this.suggestionModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`${getLoggerDate()} Task suggestion not found`);
        } else {
            return { deleted: true };
        }
    }

    async completeTask(id: string): Promise<TaskSuggestion> {
        const task = await this.suggestionModel.findById(id).exec();
        if (!task) {
            throw new NotFoundException(`${getLoggerDate()} Task suggestion not found`);
        }

        task.completionCount += 1;
        task.lastCompletedAt = new Date();

        return task.save();
    }
}
