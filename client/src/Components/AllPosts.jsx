import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setFriends, setPost, setPosts } from '../States'
import "../Styles/AllPosts.css"
import { useNavigate } from 'react-router-dom'
import Friends from './Friends'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

function AllPosts() {

    const [feed, setFeed] = useState([])
    const dispatch = useDispatch()
    const loggedUser = useSelector((state) => state.user._id)
    const loggedUserData = useSelector((state) => state.user)
    const [comment, setComment] = useState("")
    const navigate = useNavigate()
    const token = useSelector((state) => state.token)
    
    const [isCommentsVisible, setIsCommentsVisible] = useState(false)


    const [friendData, setFriendData] = useState({
        name: "",
        friendId: "",
        location: "",
        userPicturePath: ""

    })

    const getAllPosts = async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/posts`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) => {
                const alldata = response.data
                setFeed(alldata.reverse())
                dispatch(setPosts({ posts: response.data }))
            }).catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getAllPosts()
    }, [])

    const handleComments = () => {
        setIsCommentsVisible(!isCommentsVisible)
    }

    const HandleAddComment = async (id) => {
        console.log(token)
        if (!comment) {
            toast.error("Can't post empty comment")
            return
        }
        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/posts/${id}/addcomment`, {
            commentData: ` ${loggedUserData.firstName} ${loggedUserData.lastName} : ${comment}`
        },
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) => {
                // console.log(response)
                dispatch(setPost({ post: response }))
                setComment("")
                toast.success("Comment added")
            }).catch((err) => {
                console.log(err)
            });
    }

    const HandleLike = async (id, e) => {
        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/posts/${id}/like`, {
            userId: loggedUser
        },
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((response) => {
                // console.log(response)
                dispatch(setPost({ post: response }))
            }).catch((error) => {
                console.log(error)
            })
    }

    const patchFriend = async (id, friendId) => {
        axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/${id}/${friendId}`).then((response) => {
                // console.log(response.data)
                dispatch(setFriends({ friends: response.data }))
            }).catch((err) => {
                console.log(err)
            })
        window.location.reload(false)
    }

    const handleFriends = (post) => {

        setFriendData({
            ...friendData,
            name: "",
            location: "",
            friendId: "",
            userPicturePath: ""
        })

        const name = `${post.firstName} ${post.lastName}`
        const friendId = post.userId
        const location = post.location
        const userPicturePath = post.userPicturePath

        setFriendData({
            ...friendData,
            name: name,
            location: location,
            friendId: friendId,
            userPicturePath: userPicturePath
        })

        patchFriend(loggedUser, friendId)
    }

    return (
        <div>
            <motion.div

                initial={{ opacity: 0, y: "-200vh" }}
                animate={{ opacity: 1, y: "0" }}
                exit={{ opacity: 0, y: "-200vh" }}
                transition={{ duration: 1, delay: 0.2 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}

                className="posts-wrapper">
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
                            <i onClick={() => handleFriends(post)} className='fa fa-user-plus'></i>
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
                                            <span style={{ fontWeight: "bolder" }}>{i + 1}.</span>
                                            <span>{comment}</span>
                                            < hr style={{ margin: "1px" }} />
                                        </div>
                                    )
                                })}
                            </div>
                            <hr />
                        </div>
                    )
                })}
            </motion.div >
            <div style={{ display: "none" }}>
                <Friends name={friendData.name}
                    friendId={friendData.friendId}
                    location={friendData.location}
                    userPicturePath={friendData.userPicturePath}
                />
            </div>
        </div>
    )
}

export default AllPosts