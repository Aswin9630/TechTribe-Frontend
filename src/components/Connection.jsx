import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../redux/slice/connectionSlice';
import useFetchUser from "../hooks/useFetchUser"
import ShimmerUI from './ShimmerUI';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../utils/constants';
import { Link } from 'react-router-dom';

const Connection = () => {
  const dispatch = useDispatch()
  const {connections} = useSelector(store=>store.connections) 
   
  useFetchUser()
  useEffect(()=>{
    fetchConnections()
  },[])

  const fetchConnections = async ()=>{
    try {
      const response = await axios.get(`${BACKEND_URL}/user/connections`, {withCredentials:true} ) 
      dispatch(addConnections(response.data?.data))
      
    } catch (error) {
      toast.error(error);    
    }
  }
 

  if(!connections) return <ShimmerUI/>

  if( connections.length === 0) return <h1 className='text-2xl text-center font-bold my-10'>NO CONNECTION FOUND!</h1>

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
            <Link to={`/chat/${user._id}`}><button className='font-bold tracking-tighter border px-2 py-1 border-yellow-400 hover:bg-gray-900 hover:text-amber-700 rounded-lg'>CHAT</button></Link>
          </div>
           
        ))}
      </div>
    </div>
  )
}

export default Connection