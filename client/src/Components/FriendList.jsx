import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Friends from './Friends'
import "../Styles/Friends.css"

function FriendList({ userId }) {

    const dispatch = useDispatch()
    const friends = useSelector((state) => state.user.friends)

    const [friendsList, setFriendsList] = useState([])

    const getFriends = async () => {
        await axios.get(`http://localhost:5000/api/${userId}/friends`).then((response) => {
            console.log(response.data)
            setFriendsList(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getFriends()
    }, [])

    return (
        <div className='friends-final-wrapper'>
            <span>User's Friend List</span>
            {friendsList.map((friend) => {
                return (
                    <div className="friends-wrapper">
                        <Friends name={`${friend.firstName} ${friend.lastName}`}
                            location={friend.location}
                            picturePath={friend.picturePath}
                        />
                    </div>
                )
            })
            }
        </div>
    )
}

export default FriendList