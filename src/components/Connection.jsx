import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../redux/slice/connectionSlice';
import useFetchUser from "../hooks/useFetchUser"
import ShimmerUI from './ShimmerUI';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const Connection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading ] = useState(true);

  const {connections} = useSelector(store=>store.connections) 
  const users = useSelector(store=>store.user)
  const isPremium = users?.user?.isPremium
  
   
  useFetchUser()
  useEffect(()=>{
    fetchConnections()
  },[])


  const handleChatAccess = (userId) => {
    if (isPremium) {
      window.location.href = `/chat/${userId}`;
    } else {
      toast.warning(
        <div>
        <p>Upgrade to premium for chat access</p>
        <button 
          onClick={() => navigate("/premium")} 
          style={{
            backgroundColor: "#facc15", 
            color: "white", 
            fontFamily:'serif',
            border: "none", 
            padding: "8px 12px", 
            borderRadius: "5px", 
            cursor: "pointer", 
            marginTop: "10px"
          }}
        >
          Upgrade Now
        </button>
      </div>,
       {
        position: "top-center",
        autoClose: false, 
        closeOnClick: true, 
      }
      );
      
    }
  };

  const fetchConnections = async ()=>{
    try {
      const response = await axios.get(`${BACKEND_URL}/user/connections`, {withCredentials:true} ) 
      dispatch(addConnections(response.data?.data))
      setLoading(false)
    } catch (error) {
      toast.error(error);    
    }
  }
 

  if(loading) return <ShimmerUI/>

  if( connections.length === 0 || !connections) return <h1 className='text-2xl text-center font-bold my-10'>NO CONNECTION FOUND!</h1>

  return (
    <div>
        <h1 className='text-4xl font-bold text-center my-7'>Connections</h1>
      <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        
          {connections.map((user)=>(
          <div key={user._id} className='shadow-lg flex gap-5 mx-auto items-center border border-yellow-300 m-2 p-2 rounded-lg'>
            <div>
              <img src={user.photoURL} className="w-10 h-10 rounded-full" alt="img" />
            </div>
            <div>
              <h1 className='font-semibold'>{user.firstName} {user.lastName}</h1>
              <p>{user.designation}</p>
            </div>
             <button onClick={()=>handleChatAccess(user._id)} className='font-bold tracking-tighter border px-2 py-1 border-yellow-400 hover:bg-gray-900 hover:text-amber-700 rounded-lg'>CHAT</button>
          </div>
           
        ))}
      </div>
    </div>
  )
}

export default Connection