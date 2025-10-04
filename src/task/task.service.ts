import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../common/schemas/task.schema';
import { CreateTaskDto } from '../common/dto/create-task.dto';
import { UpdateTaskDto } from '../common/dto/update-task.dto';
import { log } from 'console';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) { }

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        console.log('Creating task with data:', createTaskDto);

        
        // Generate unique IDs for actions
        if (createTaskDto.actions) {
            createTaskDto.actions = createTaskDto.actions.map(action => ({
                ...action,
                id: new Date().getTime().toString() + Math.random().toString(36).substr(2, 9),
            }));
        }

        const createdTask = new this.taskModel(createTaskDto);
        console.log('Created task instance:', createdTask);
        
        return createdTask.save();
    }

    async findAll(): Promise<Task[]> {
        const tasks = await this.taskModel.find().populate('createdBy', 'username firstName lastName').exec();
        return this.taskModel.find().populate('createdBy', 'username firstName lastName').exec();
    }

    async findOne(id: string): Promise<Task> {
        const task = await this.taskModel
            .findById(id)
            .populate('createdBy', 'username firstName lastName')
            .exec();

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return task;
    }

    async findByUser(userId: string): Promise<Task[]> {
        return this.taskModel
            .find({ createdBy: userId })
            .populate('createdBy', 'username firstName lastName')
            .exec();
    }

    async findByCategory(category: string): Promise<Task[]> {
        return this.taskModel
            .find({ category })
            .populate('createdBy', 'username firstName lastName')
            .exec();
    }

    async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        // Generate unique IDs for new actions
        if (updateTaskDto.actions) {
            updateTaskDto.actions = updateTaskDto.actions.map(action => ({
                ...action,
                id: action.id || new Date().getTime().toString() + Math.random().toString(36).substr(2, 9),
            }));
        }

        const updatedTask = await this.taskModel
            .findByIdAndUpdate(id, updateTaskDto, { new: true })
            .populate('createdBy', 'username firstName lastName')
            .exec();

        if (!updatedTask) {
            throw new NotFoundException('Task not found');
        }

        return updatedTask;
    }

    async remove(id: string): Promise<void> {
        const result = await this.taskModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException('Task not found');
        }
    }

    async completeTask(id: string): Promise<Task> {
        const task = await this.taskModel.findById(id).exec();
        if (!task) {
            throw new NotFoundException('Task not found');
        }

        task.completionCount += 1;
        task.lastCompletedAt = new Date();
        task.isInProgress = false;

        return task.save();
    }

    async startTask(id: string): Promise<Task> {
        const task = await this.taskModel.findById(id).exec();
        if (!task) {
            throw new NotFoundException('Task not found');
        }

        task.isInProgress = true;
        return task.save();
    }

    async stopTask(id: string): Promise<Task> {
        const task = await this.taskModel.findById(id).exec();
        if (!task) {
            throw new NotFoundException('Task not found');
        }

        task.isInProgress = false;
        return task.save();
    }
}
