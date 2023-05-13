import Post from "../Models/Post.js";
import User from "../Models/User.js";

export const getFeedPosts = async (req, res) => {
    try {
        const allPost = await Post.find()
        res.status(201).json(allPost)
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
}