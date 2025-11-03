import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskSuggestionDto } from './create-suggestion.dto';

export class UpdateTaskSuggestionDto extends PartialType(CreateTaskSuggestionDto) { }
