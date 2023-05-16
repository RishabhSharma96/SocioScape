import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPost } from '../States'
import axios from 'axios'
import "../Styles/Posts.css"
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Posts() {

    const dispatch = useDispatch()
    const _id = useSelector((state) => state.user._id)
    const profilePic = useSelector((state) => state.user.picturePath)
    const navigate = useNavigate()

    const [postData, setPostData] = useState({
        userId: _id,
        picturePath: "",
        description: ""
    })

    const uploadImages = async (e) => {
        const files = e.target.files;
        const formData = new FormData();
        for (const file of files) {
            formData.append("file", file);
            formData.append("upload_preset", "socioscape")
        }
        const data = await axios
            .post("https://api.cloudinary.com/v1_1/digqsa0hu/image/upload",
                formData
            )
            .then((response) => {
                console.log(response.data.secure_url);
                setPostData({ ...postData, picturePath: response.data.secure_url });
                toast.success("Post picture added successfully")
            }).catch((error) => {
                console.log(error)
                toast.error(error.message + " picture adding unsuccessful")
            })
    }

    const HandlePost = async (e) => {
        e.preventDefault()

        if (!postData.picturePath || !postData.description) {
            toast.error("Please fill all fields")
            return
        }

        await axios.post("http://localhost:5000/api/posts", {
            picturePath: postData.picturePath,
            userId: postData.userId,
            description: postData.description
        }).then((response) => {
            console.log(response)
            dispatch(setPost({ response }))
            toast.success("Post added Successfully")
            setPostData({ ...postData, picturePath: "", description: "" })
        }).catch((error) => {
            console.log(error)
        })

        window.location.reload(true)
    }

    return (
        <div className='post-form'>
            <form>
                <div className="write">
                    <img src={profilePic} alt="" onClick={() => navigate(`/profile/${_id}`)} />
                    <input
                        type="text"
                        placeholder="What's on your mind?"
                        value={postData.description}
                        onChange={(e) => setPostData({ ...postData, description: e.target.value })}
                    />
                </div>
                <div className="photo-upload post-uploader">
                    <div  >
                        <input className='photo-uploader post-img' style={{ width: "17rem" }} type="file" name='image' onChange={uploadImages} />
                    </div>
                </div>
                <div className="upload-btn">
                    <input type="submit" value="Post" onClick={HandlePost} />
                </div>
            </form>
        </div>
    )
}

export default Posts