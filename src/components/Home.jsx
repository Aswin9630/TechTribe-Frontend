import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(store=>store.user);


const fetchUserDetails = async()=>{
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile/view`,{withCredentials:true})
    dispatch(addUser(response.data))
  } catch (error) {
    navigate("/login")
    console.error(error)
  }
}

useEffect(()=>{
  fetchUserDetails()
},[])

  return (
    <div>Home</div>
  )
}

export default Home