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
    department: string;

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

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// 2. Configure Schema Options for Output
// This tells Mongoose to apply transformations when converting the document.
TaskSchema.set('toJSON', {
    virtuals: true, // Include virtual properties ('id')
    transform: (doc, ret) => {
        delete ret._id; // Remove the original '_id' field
        delete ret.__v; // Optionally remove the version key
        return ret;
    },
});

TaskSchema.set('toObject', {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});