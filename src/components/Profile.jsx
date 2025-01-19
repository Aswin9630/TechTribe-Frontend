import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import useFetchUser from '../hooks/useFetchUser';


const Profile = () => {
  console.log("test");
  
  useFetchUser()
  "testing"
  const users = useSelector(store=>store.user);
  
  return users &&  (

    <div>
      <EditProfile user={users.user}/>
    </div>
  
  )
}

export default Profile