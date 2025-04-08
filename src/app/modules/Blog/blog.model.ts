import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Blog Title is required!!!'],
    },
    content: { type: String, required: [true, 'Blog Content is required!!!'] },
    author: {
      type: Schema.Types.ObjectId,
      required: [true, 'Author is required!!!'],
      ref: 'User',
    },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Blog = model<TBlog>('Blog', blogSchema);
