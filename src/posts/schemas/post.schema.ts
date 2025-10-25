import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  author: string;

  @Prop()
  content: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
