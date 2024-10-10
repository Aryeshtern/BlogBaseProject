import Post from '../models/postModel'
import User from '../models/userModel'

export const createPostDB = async (title:string, content: string, _id: string) =>{
    const newPost = new Post({
        title,
        content,
        author: _id
    })
    await newPost.save()
    await User.findByIdAndUpdate(_id, {$push: {posts: newPost._id}})
    return newPost;
}