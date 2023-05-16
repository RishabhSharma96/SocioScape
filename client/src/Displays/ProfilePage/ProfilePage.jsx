import React from 'react'
import ProfileSider from '../../Components/ProfileSider'
import { useParams } from 'react-router-dom'
import "./ProfilePage.css"
import Navbar from '../../Components/Navbar'
import UserPosts from '../../Components/UserPosts'
import Posts from '../../Components/Posts'

function ProfilePage() {

  const { id } = useParams()

  return (
    <div>
      <Navbar />
      <div className='profile-page-compponent'>
        <ProfileSider userId={id} />
        <div>
          <Posts />
          <UserPosts userId={id} />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage