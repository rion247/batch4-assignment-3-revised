import { model, Schema } from 'mongoose';
import { TBlog, TBlogModel } from './blog.interface';

const blogSchema = new Schema<TBlog, TBlogModel>(
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

blogSchema.statics.isBlogExist = async function (id: string) {
  const blogData = await Blog.findById(id);
  return blogData;
};

export const Blog = model<TBlog, TBlogModel>('Blog', blogSchema);
