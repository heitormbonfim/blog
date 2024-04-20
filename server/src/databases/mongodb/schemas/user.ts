import { ObjectId, Schema, model } from "mongoose";

export interface User {
  _id?: ObjectId | string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  password: string;
  role: string;
  following?: string[];
  created_at?: Date;
  updated_at?: Date;
}

const userSchema = new Schema<User>(
  {
    name: {
      first: {
        type: String,
        maxlength: 100,
        trim: true,
        required: true,
      },

      last: {
        type: String,
        maxlength: 100,
        trim: true,
        required: true,
      },
    },

    email: {
      type: String,
      maxlength: 120,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      lowercase: true,
      trim: true,
      default: "user",
      required: true,
    },

    following: {
      type: [String],
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.index({ email: 1 });

const user = model("users", userSchema);
export default user;
