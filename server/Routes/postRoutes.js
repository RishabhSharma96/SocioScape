import express from "express"
import { verifyToken } from "../Middleware/Auth.js"
import { getFeedPosts } from "../Controllers/GetFeed.js"
import { getUserPosts } from "../Controllers/GetUserPosts.js"
import { likePost } from "../Controllers/LikePost.js"

const router = express.Router() 

router.get("/", verifyToken, getFeedPosts)
router.get("/:id/posts", verifyToken, getUserPosts)
router.patch("/:id/like", verifyToken, likePost)

export default router