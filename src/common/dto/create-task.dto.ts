import { IsNotEmpty, IsOptional, IsString, IsUrl, IsArray, ValidateNested, IsBoolean, IsMongoId, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CreateActionDto } from './create-action.dto';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsString()
    department: string;

    @IsUrl()
    @IsOptional()
    @Transform(({ value }) => (value === '' ? undefined : value))
    url?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateActionDto)
    actions?: CreateActionDto[];

    @IsNotEmpty()
    @IsMongoId()
    createdBy: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsNumber()
    completionCount?: number;

    @IsOptional()
    @IsBoolean()
    isCompleted?: number;
}
