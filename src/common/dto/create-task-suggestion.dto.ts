import { 
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    IsArray,
    ValidateNested,
    IsBoolean,
    IsMongoId,
    IsNumber,
    IsDate,
    isString
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CreateActionDto } from './create-action.dto';

export class CreateTaskSuggestionDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsString()
    department: string;

    @IsOptional()
    @IsString()
    status?: string;

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
    suggestedBy: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsNumber()
    completionCount?: number;

    @IsOptional()
    @IsBoolean()
    isCompleted?: number;

    @IsOptional()
    @IsString()
    recurring?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dueDate?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    reviewedAt?: Date;
    
    @IsOptional()
    @IsString()
    reviewedBy?: Date;
}
