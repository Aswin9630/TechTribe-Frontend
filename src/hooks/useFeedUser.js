import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addFeedUsers } from '../redux/slice/feedSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../utils/constants';

const useFeedUser = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
   
    const fetchFeedUser = async()=>{
        try {
            const response = await axios.get(`${BACKEND_URL}/user/feed`,{withCredentials:true});
            if(response.data?.data){
                dispatch(addFeedUsers(response.data?.data))
            } else{
                toast.warn("No user data received, redirecting to login...");
                navigate("/login")
            }           

        } catch (error) {
            toast.error(error)
        }
    }

    fetchFeedUser();

},[dispatch,navigate]);

return null;

}

export default useFeedUser;