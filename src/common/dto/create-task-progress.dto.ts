import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsBoolean,
    IsNumber,
    IsDate,
    IsDateString
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
    @IsDateString()
    startedAt?: string;

    @IsOptional()
    @IsDateString()
    completedAt?: string;
}
