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
          dispatch(addUser(response.data))
        } catch (error) {
          navigate("/login")
          console.error(error)
        }
      };

    fetchUserDetails()
  },[]);

return null;

}

export default useFetchUser;