import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuggestionsService } from './suggestions.service';
import { SuggestionsController } from './suggestions.controller';
import { TaskSuggestion, TaskSuggestionSchema } from 'src/common/schemas/suggestion.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: TaskSuggestion.name, schema: TaskSuggestionSchema }])],
    controllers: [SuggestionsController],
    providers: [SuggestionsService],
    exports: [SuggestionsService],
})
export class SuggestionsModule { }
