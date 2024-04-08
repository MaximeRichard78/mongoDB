import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema'; // Assurez-vous que le chemin d'importation est correct

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ index: true })
  title: string;

  @Prop() 
  date: Date; // This is now the built-in JavaScript Date type

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);