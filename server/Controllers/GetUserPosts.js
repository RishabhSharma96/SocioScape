import Post from "../Models/Post.js";
import User from "../Models/User.js";

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params
        const allPost = await Post.find({ userId })
        res.status(201).json(allPost)
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
}