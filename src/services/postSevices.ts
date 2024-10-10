import Post, { IComment } from "../models/postModel";
import User, { IUser } from "../models/userModel";

export const createPostDB = async (
  title: string,
  content: string,
  _id: string
) => {
  const newPost = new Post({
    title,
    content,
    author: _id,
  });
  await newPost.save();
  await User.findByIdAndUpdate(_id, { $push: { posts: newPost._id } });
  return newPost;
};

export const deletePostDB = async (_id: string) => {
  return Post.findByIdAndDelete(_id);
};

export const updatePostDB = async (
  _id: string,
  updatedData: Partial<IUser>
) => {
  return Post.findByIdAndUpdate(_id, updatedData, { new: true }).select(
    "-password"
  );
};

export const getPostsByUserIdDB = async (_id: string) => {
  return User.findById(_id).populate("posts");
};

export const getAllPostsDB = async () => {
  return Post.find()
    .populate({
      path: "author",
      select: "username email profile",
    })
    .populate({
      path: "comments.author",
      select: "username",
    });
};

export const getPostByIdDB = async (_id: string) => {
  return Post.findById(_id)
    .populate({
      path: "author",
      select: "username email profile",
    })
    .populate({
      path: "comments.author",
      select: "username",
    });
};

// export const getPostsByTitleDB = async (title: string) => {
//     return Post.findOne({ title });
// }

export const addConnentDB = async (comment: IComment, _id: string) => {
  return Post.findByIdAndUpdate(_id, { $push: { comments: comment } });
};
