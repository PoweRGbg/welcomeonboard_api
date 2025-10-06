import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskProgress, TaskProgressDocument } from 'src/common/schemas/task-progress.schema';
import { CreateTaskProgressDto } from 'src/common/dto/create-task-progress.dto';
import { UpdateTaskProgressDto } from 'src/common/dto/update-task-progress.dto';

@Injectable()
export class TaskProgressService {
    constructor(@InjectModel(TaskProgress.name) private taskProgressModel: Model<TaskProgressDocument>) { }

    async create(createTaskProgressDto: CreateTaskProgressDto): Promise<TaskProgress> {
        console.log('Creating task progress with data:', createTaskProgressDto);

        const createdTask = new this.taskProgressModel(createTaskProgressDto);
        console.log('Created task instance:', createdTask);
        
        return createdTask.save();
    }

    async findAll(): Promise<TaskProgress[]> {
        const tasks = await this.taskProgressModel.find().exec();
        return this.taskProgressModel.find().exec();
    }

    async findOne(id: string): Promise<TaskProgress> {
        const task = await this.taskProgressModel
            // .findOne({ taskId: id }, { _id: 0, createadAt: 0, startedAt: 0 })
            .findOne({ taskId: id }, { createadAt: 0, startedAt: 0 })
            .exec();

        if (!task) {
            this.createNewTaskProgress(id);
        }

        return task;
    }

    async findByUser(userId: string): Promise<TaskProgress[]> {
        return this.taskProgressModel
            .find({ createdBy: userId }, { _id: 0, createadAt: 0, startedAt: 0 })
            .exec();
    }

    async findByCategory(category: string): Promise<TaskProgress[]> {
        return this.taskProgressModel
            .find({ category })
            .exec();
    }

    async update(id: string, updateTaskProgressDto: UpdateTaskProgressDto): Promise <TaskProgress> {
        // Generate unique IDs for new actions
        console.log('Wanted completed actions ', updateTaskProgressDto.actionsCompleted);
        
        const progressToUpdate = await this.taskProgressModel.findOne({ taskId: id });
        const found = this.findOne(id);
        console.log('Found:', found);
        

        let newProgress: CreateTaskProgressDto;

        if (!progressToUpdate) {
            newProgress = {
                taskId: id,
                userId: updateTaskProgressDto.userId,
                actionsTotal: updateTaskProgressDto.actionsTotal,
                actionsCompleted: 0,
                startedAt: new Date().toString(),
                completedAt: '',
                isCompleted: false,
            };
        } else {
            newProgress = this.createNewTaskProgress(updateTaskProgressDto);
        }

        const updatedTask = await this.taskProgressModel
            .findByIdAndUpdate(progressToUpdate._id, progressToUpdate)
            .exec();

        if (!updatedTask) {
            throw new NotFoundException('Task not found');
        } else {
            console.log('Task updated', updatedTask);
        }

        return updatedTask;
    
    }

    async remove(id: string): Promise<void> {
        const result = await this.taskProgressModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException('Task not found');
        }
    }

    async completeTask(id: string): Promise<TaskProgress> {
        const taskProgress = await this.taskProgressModel.findById(id).exec();
        if (!taskProgress) {
            throw new NotFoundException('Task not found');
        }

        taskProgress.completedAt = new Date();
        taskProgress.isCompleted = true;

        return taskProgress.save();
    }

    async startTask(id: string): Promise<TaskProgress> {
        const taskProgress = await this.taskProgressModel.findById(id).exec();
        if (!taskProgress) {
            throw new NotFoundException('Task not found');
        }

        taskProgress.isCompleted = false;
        return taskProgress.save();
    }

    async stopTask(id: string): Promise<TaskProgress> {
        const taskProgress = await this.taskProgressModel.findById(id).exec();
        if (!taskProgress) {
            throw new NotFoundException('Task not found');
        }

        taskProgress.isCompleted = false;
        taskProgress.actionsCompleted = 0;
        return taskProgress.save();
    }

    private createNewTaskProgress(updateTaskProgressDto): CreateTaskProgressDto {
        return {
            ...updateTaskProgressDto,
            taskId: updateTaskProgressDto.taskId,
            userId: updateTaskProgressDto.userId,
            actionsTotal: updateTaskProgressDto.actionsTotal,
            actionsCompleted: updateTaskProgressDto.actionsCompleted,
            startedAt: updateTaskProgressDto.startedAt,
            isCompleted: updateTaskProgressDto.actionsCompleted === updateTaskProgressDto.actionsTotal,
            completedAt: updateTaskProgressDto.actionsCompleted === updateTaskProgressDto.actionsTotal ?
                new Date().toString() :
                '',
        };
    }
}
