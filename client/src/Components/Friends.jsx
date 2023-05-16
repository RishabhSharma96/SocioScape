import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFriends } from '../States'
import { useNavigate } from 'react-router-dom'

function Friends() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const id = useSelector((state)=>state.user._id)
    const friends = useSelector((state)=>state.user.friends)

    

    return (
        <div>

        </div>
    )
}

export default Friends