import mongoose, { Schema, Document, Types } from "mongoose";

export interface IComment {
  content: string;
  author?: Types.ObjectId;
  createdAt: Date;
}

export interface IPost extends Document {
  title: string;
  content: string;
  author?: Types.ObjectId;
  comments: IComment[];
}

const CommentSchema = new Schema<IComment>({
  content: { type: String, required: true },
  author: { type: Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
}, {
  timestamps: true
});

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Types.ObjectId, ref: "User", required: true },
  comments: [CommentSchema],
}, {
  timestamps: true
});

export default mongoose.model<IPost>("Post", PostSchema);
