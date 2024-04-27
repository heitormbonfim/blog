import { ObjectId, Schema, model } from "mongoose";

export interface Post {
  _id?: ObjectId | string;
  nameId: string;
  blogId: string;
  content: string;
  author: string;
  likes?: number;
  shares?: number;
  comments?: number;
  hidden?: boolean;
}

const postSchema = new Schema<Post>(
  {
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

    likes: {
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
