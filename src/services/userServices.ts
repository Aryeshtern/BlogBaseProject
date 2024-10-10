import User, { IUser } from "../models/userModel";

export const createUserDB = async (userDetailes: IUser) => {
  const { username, password, email, profile } = userDetailes;
  const newUser = new User({
    username,
    password,
    email,
    profile,
  });
  return newUser.save();
};

export const getUserBynameDB = async (username: string) => {
  return await User.findOne({ username }).select("-password").populate("posts");
};

export const getAllUsersDB = async () => {
  return await User.find().select("-password").populate("posts");
};
