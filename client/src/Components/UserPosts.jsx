import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setPost } from '../States'
import "../Styles/AllPosts.css"
import { useNavigate } from 'react-router-dom'

function UserPosts({ userId }) {

    const [feed, setFeed] = useState([])
    const dispatch = useDispatch()
    const [isCommentsVisible, setIsCommentsVisible] = useState(false)
    const loggedUser = useSelector((state) => state.user._id)
    const [comment, setComment] = useState("")
    const navigate = useNavigate()

    const getUserPosts = async () => {
        console.log(userId)
        await axios.get(`http://localhost:5000/api/posts/${userId}`).then((response) => {
            const alldata = response.data
            setFeed(alldata.reverse())
            // dispatch(setPosts({ posts: response }))
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getUserPosts()
    }, [])

    const handleComments = () => {
        setIsCommentsVisible(!isCommentsVisible)
    }

    const HandleAddComment = async (id) => {
        await axios.patch(`http://localhost:5000/api/posts/${id}/addcomment`, {
            commentData: comment
        }).then((response) => {
            console.log(response)
            dispatch(setPost({ post: response }))
        }).catch((err) => {
            console.log(err)
        });
    }

    const HandleLike = async (id) => {
        await axios.patch(`http://localhost:5000/api/posts/${id}/like`, {
            userId: loggedUser
        }).then((response) => {
            console.log(response)
            dispatch(setPost({ post: response }))
        }).catch((error) => {
            console.log(error)
        })
    }
    
    return (
        <div className="posts-wrapper">
            {feed.map((post) => {
                return (
                    <div className="single-post">
                        <div className='post-header'>
                            <div>
                                <img onClick={() => { navigate(`/profile/${post.userId}`) }} className="post-user-pic" src={post.userPicturePath} alt="" />
                            </div>
                            <div onClick={() => { navigate(`/profile/${post.userId}`) }} className="user-details">
                                <span>{post.firstName}&nbsp;{post.lastName}</span>
                                <p>{post.location}</p>
                            </div>
                        </div>
                        <i className='fa fa-user-plus'></i>
                        <div>
                            <p className='post-description'>{post.description}</p>
                            <img className='main-post-image' src={post.picturePath} alt="" />
                        </div>
                        <div className='likes-comments'>
                            <div className="like-area">
                                <i className={Boolean(post.likes[loggedUser]) === true ? "fa fa-heart" : "fa fa-heart-o"}
                                    onClick={() => HandleLike(post._id)}></i><span>{Object.keys(post.likes).length}</span>
                            </div>
                            <div className='like-area'>
                                <i className='fa fa-commenting-o' onClick={(handleComments)}></i><span>{post.comments.length}</span>
                            </div>
                            <div className="comment-area">
                                <input
                                    type="text"
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                    placeholder='Add Comment'
                                    className='comment-input'
                                />
                                <input className='comment-btn' type="submit" value="Comment" onClick={() => HandleAddComment(post._id)} />
                            </div>
                        </div>
                        <div className={isCommentsVisible ? "comment-section visible" : "invisible"}>
                            {post.comments.map((comment, i) => {
                                return (
                                    <div>
                                        <span style={{ fontWeight: "bolder" }}>{i + 1}.</span> <span>{comment}</span>
                                        < hr style={{ margin: "1px" }} />
                                    </div>
                                )
                            })}
                        </div>
                        <hr />
                    </div>
                )
            })}



        </div >
    )
}

export default UserPosts