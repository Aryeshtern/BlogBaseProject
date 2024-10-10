import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
  username: string;
  email: string;
  profile: {
    bio?: string;
    socialLinks?: string[];
  };
  posts: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Username is required."],
    unique: true,
    lowercase: true,
    validate: function (value: string) {
     validator.isAlphanumeric(value), "Username can only contain alphanumeric characters."
    },
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
    validate: function (value: string) {
     validator.isEmail(value), "Invalid email format."
    },
  },
  profile: {
    bio: String,
    socialLinks: [String],
  },
  posts: [{ type: Types.ObjectId, ref: "Post" }],
});

export default mongoose.model<IUser>("User", UserSchema);
