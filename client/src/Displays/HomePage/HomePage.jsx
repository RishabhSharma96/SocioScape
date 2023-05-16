import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar'
import ProfileSider from '../../Components/ProfileSider'
import "./HomePage.css"
import { useSelector } from 'react-redux'
import Posts from '../../Components/Posts'
import AllPosts from '../../Components/AllPosts'
import FriendList from '../../Components/FriendList'
import Advertisement from '../../Components/Advertisement'

function HomePage() {

  const _id = useSelector((state) => state.user._id)

  return (
    <div>
      <Navbar />
      <div className="home-main">
        <ProfileSider userId={_id} />
        <div className="postArea">
          <Posts />
          <AllPosts />
        </div>
        <div className='right-sider'>
          <Advertisement />
          <FriendList userId={_id} />
        </div>
      </div>
    </div>
  )
}

export default HomePage