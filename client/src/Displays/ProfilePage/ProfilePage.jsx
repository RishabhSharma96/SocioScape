import React from 'react'
import ProfileSider from '../../Components/ProfileSider'
import { useParams } from 'react-router-dom'
import "./ProfilePage.css"
import Navbar from '../../Components/Navbar'
import UserPosts from '../../Components/UserPosts'
import Posts from '../../Components/Posts'
import Advertisement from '../../Components/Advertisement'
import FriendList from '../../Components/FriendList'

function ProfilePage() {

  const { id } = useParams()

  return (
    <div>
      <Navbar />
      <div className='home-main'>
        <ProfileSider userId={id} />
        <div className="postArea">
          <Posts />
          <UserPosts userId={id} />
        </div>
        <div className='right-sider'>
          <Advertisement />
          <FriendList userId={id} />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage