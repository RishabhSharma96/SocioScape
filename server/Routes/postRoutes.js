import express from "express"
import { getFeedPosts } from "../Controllers/GetFeed.js"
import { getUserPosts } from "../Controllers/GetUserPosts.js"
import { likePost } from "../Controllers/LikePost.js"
import { addComment } from "../Controllers/AddComment.js"

const router = express.Router() 

router.get("/", getFeedPosts)
router.get("/:id", getUserPosts)
router.patch("/:id/like", likePost)
router.patch("/:id/addcomment", addComment)

export default router