import React from 'react'
import { ProfileSideBar } from './ProfileSideBar'

const Profile = () => {
  return (
    <div>
        <div className="lg:flex justify-between">
      <div className="sticky h-[80vh] lg:w-[20%]">
        <ProfileSideBar/>
      </div>
      <div className="lg:w-[80%]">
        
      </div>
    </div>
    </div>
  )
}

export default Profile
