import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskProgressService } from './task-progress.service';
import { TaskProgressController } from './task-progress.controller';
import { TaskProgress, TaskProgressSchema } from 'src/common/schemas/task-progress.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: TaskProgress.name, schema: TaskProgressSchema }])],
    controllers: [TaskProgressController],
    providers: [TaskProgressService],
    exports: [TaskProgressService]
,
})
export class TaskProgressModule { }
