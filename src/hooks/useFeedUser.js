import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addFeedUsers } from '../redux/slice/feedSlice';

const useFeedUser = ()=>{
    const dispatch = useDispatch()

    useEffect(()=>{
   
    const fetchFeedUser = async()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/feed`,{withCredentials:true});
            dispatch(addFeedUsers(response?.data?.data))

        } catch (error) {
            console.error(error)
        }
    }

    fetchFeedUser();

},[dispatch]);

return null;

}

export default useFeedUser;