import { ObjectId, Schema, model } from "mongoose";

export interface Post {
  _id?: ObjectId | string;
  title: string;
  summary: string;
  nameId: string;
  blogId: string;
  content: string;
  author: string;
  views?: number;
  shares?: number;
  comments?: number;
  hidden?: boolean;
}

const postSchema = new Schema<Post>(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 150,
      required: true,
    },

    summary: {
      type: String,
      trim: true,
      maxlength: 10_000,
      required: true,
    },

    nameId: {
      type: String,
      trim: true,
      maxlength: 10_000,
      required: true,
    },

    blogId: {
      type: String,
      trim: true,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      trim: true,
      maxlength: 150,
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    comments: {
      type: Number,
      default: 0,
    },

    shares: {
      type: Number,
      default: 0,
    },

    hidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "posts",
  }
);

postSchema.index({ nameId: 1 });

const post = model("posts", postSchema);

export default post;
