import { ObjectId, Schema, model } from "mongoose";

export interface Blog {
  _id?: ObjectId | string;
  name: string;
  nameId: string;
  description: string;
  ownerId: string;
  followers?: string[];
}

const blogSchema = new Schema<Blog>(
  {
    name: {
      required: true,
      type: String,
      unique: true,
      trim: true,
      maxlength: 100,
    },

    nameId: {
      required: true,
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },

    description: {
      required: true,
      type: String,
      trim: true,
      maxlength: 10000,
    },

    ownerId: {
      required: true,
      type: String,
      maxlength: 1000,
    },

    followers: { type: [String], default: [] },
  },
  {
    timestamps: true,
    collection: "blogs",
  }
);

blogSchema.index({ ownerId: 1 });

const blog = model("blogs", blogSchema);

export default blog;
