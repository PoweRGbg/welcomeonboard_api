import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsNumber,
    IsOptional,
} from 'class-validator';

export class CreateTaskProgressDto {
    @IsNotEmpty()
    @IsString()
    taskId: string;
    
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsNumber()
    actionsTotal: number;

    @IsNotEmpty()
    @IsNumber()
    actionsCompleted: number;

    @IsNotEmpty()
    @IsBoolean()
    isCompleted: boolean;

    @IsOptional()
    @IsString()
    startedOn?: Date;
}
