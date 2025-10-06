import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskProgressDto } from './create-task-progress.dto';

export class UpdateTaskProgressDto extends PartialType(CreateTaskProgressDto) { }
