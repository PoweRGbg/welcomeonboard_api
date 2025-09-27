import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Action, ActionSchema } from './action.schema';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
    @Prop({ required: true })
    name: string;

    @Prop()
    description?: string;

    @Prop({ required: true })
    category: string;

    @Prop()
    url?: string;

    @Prop({ type: [ActionSchema], default: [] })
    actions?: Action[];

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    createdBy: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: 0 })
    completionCount: number;

    @Prop()
    lastCompletedAt?: Date;

    @Prop({ default: false })
    isInProgress: boolean;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
