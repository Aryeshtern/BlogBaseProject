import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  email: string;
  profile: {
    bio?: string;
    socialLinks?: string[];
  };
  password: string;
  posts: Types.ObjectId[];
  comparePassword(userPassword: string): Promise<boolean>
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
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: 8,
    validate: function (value: string) {
     validator.matches(value, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/), "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character."
    },
  },
  posts: [{ type: Types.ObjectId, ref: "Post" }],
});

UserSchema.pre<IUser>('save', async function(next) {
  if(this.isModified('password')){
      this.password = await bcrypt.hash(this.password, 10);
      next();
  }
  return next();

})

UserSchema.methods.comparePassword = async function(userPassword: string): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
}

export default mongoose.model<IUser>("User", UserSchema);
