import { IsNotEmpty, IsOptional, IsString, IsUrl, IsArray, ValidateNested, IsBoolean, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
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
    category: string;

    @IsOptional()
    @IsUrl()
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
}
