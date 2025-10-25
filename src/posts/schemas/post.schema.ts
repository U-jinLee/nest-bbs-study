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
}

export const PostSchema = SchemaFactory.createForClass(Post);
