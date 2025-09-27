import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActionDocument = Action & Document;

@Schema({ _id: false })
export class Action {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    description?: string;

    @Prop()
    url?: string;

    @Prop({ default: false })
    isCompleted: boolean;

    @Prop()
    completedAt?: Date;
}

export const ActionSchema = SchemaFactory.createForClass(Action);
