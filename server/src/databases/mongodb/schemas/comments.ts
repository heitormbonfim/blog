import { ObjectId, Schema, model } from "mongoose";

interface CommentSchema {
  _id?: ObjectId | string;
  postId: string;
  userName: string;
  content: string;
  likes: string[];
}

const commentSchema = new Schema<CommentSchema>(
  {
    postId: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    userName: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    content: {
      type: String,
      trim: true,
      maxlength: 100_000,
    },

    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
    collection: "comments",
  }
);

commentSchema.index({ postId: 1 });

const comment = model("comments", commentSchema);
export default comment;
