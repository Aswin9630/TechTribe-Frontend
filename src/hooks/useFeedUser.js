import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addFeedUsers } from '../redux/slice/feedSlice';
import { useNavigate } from 'react-router-dom';

const useFeedUser = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
   
    const fetchFeedUser = async()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/feed`,{withCredentials:true});
            if(response.data?.data){
                dispatch(addFeedUsers(response.data?.data))
            } else{
                console.warn("No user data received, redirecting to login...");
                navigate("/login")
            }           

        } catch (error) {
            console.error(error)
        }
    }

    fetchFeedUser();

},[dispatch,navigate]);

return null;

}

export default useFeedUser;