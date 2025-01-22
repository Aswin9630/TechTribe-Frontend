import axios from 'axios';
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';

const useFetchUser = ()=>{

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{

    const fetchUserDetails = async()=>{
      try {
        
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile/view`,{withCredentials:true})
          if(response.data.userInfo){
            dispatch(addUser(response.data.userInfo))
          }else{
            console.warn("No user data received, redirecting to login...");
            navigate("/login")
          }
         
        } catch (error) {
          console.error(error) 
          navigate("/login")
        }
      };

      fetchUserDetails()
    
  },[dispatch,navigate]);

  return null;
}

export default useFetchUser;