import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuggestionsService } from './suggestions.service';
import { SuggestionsController } from './suggestions.controller';
import { Task, TaskSchema } from '../common/schemas/task.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
    controllers: [SuggestionsController],
    providers: [SuggestionsService],
    exports: [SuggestionsService],
})
export class SuggestionsModule { }
