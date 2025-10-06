import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskProgressDocument = TaskProgress & Document;

@Schema({ timestamps: true })
export class TaskProgress {
    @Prop()
    taskId: string;

    @Prop()
    userId: string;

    @Prop()
    actionsTotal: number;

    @Prop()
    actionsCompleted: number;

    @Prop()
    isCompleted: boolean;

    @Prop({ required: true, type: Date })
    startedAt: Date;

    @Prop({ required: false, type: Date })
    completedAt?: Date;
}

export const TaskProgressSchema = SchemaFactory.createForClass(TaskProgress);
