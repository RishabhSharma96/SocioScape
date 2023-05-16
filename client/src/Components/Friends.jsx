import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFriends } from '../States'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../Styles/Friends.css"
import { toast } from 'react-hot-toast'

function Friends({ name, location, picturePath, friendId }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const id = useSelector((state) => state.user._id)
    const friends = useSelector((state) => state.user.friends)

    const isFriend = friends.find((friend) => friend._id === friendId)

    const patchFriend = async () => {
        axios.patch(`http://localhost:5000/api/${id}/${friendId}`).then((response) => {
            // console.log(response)
            dispatch(setFriends({ friends: response.data }))
            toast.success("Friend added successfully")
        }).catch((err) => {
            console.log(err)
        })
        window.location.reload(false)
    }

    return (
        <>
            <div className='friends-wrapper-single'>
                <div>
                    <img className="friend-image-area" src={picturePath} alt="" />
                </div>
                <div className="friend-details">
                    <span className='friends-name'>{name}</span>
                    <span className='friend-bio'>{location}</span>
                </div>
            </div>
        </>
    )
}

export default Friends