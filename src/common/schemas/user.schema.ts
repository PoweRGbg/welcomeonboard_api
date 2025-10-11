import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../enums/user-role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    toObject(): { [x: string]: any; password: any; } {
        return { ...this } ;
    }

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, enum: UserRole, default: UserRole.EMPLOYEE })
    role: UserRole;

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop()
    department: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
