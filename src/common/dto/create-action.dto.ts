import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUrl, IsBoolean } from 'class-validator';

export class CreateActionDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    id?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUrl()
    @Transform(({ value }) => (value === '' ? undefined : value))
    url?: string;

    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean;
}
