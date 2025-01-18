import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import useFetchUser from '../hooks/useFetchUser';


const Profile = () => {
  const users = useSelector(store=>store.user);
  useFetchUser()
  
  return users &&  (

    <div>
      <EditProfile user={users}/>
    </div>
  
  )
}

export default Profile