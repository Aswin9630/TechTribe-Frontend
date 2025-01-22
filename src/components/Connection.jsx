import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../redux/slice/connectionSlice';
import useFetchUser from "../hooks/useFetchUser"
import ShimmerUI from './ShimmerUI';

const Connection = () => {
  const dispatch = useDispatch()
  const {connections} = useSelector(store=>store.connections)  
  useFetchUser()

  const fetchConnections = async ()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/connections`, {withCredentials:true} )    
      dispatch(addConnections(response.data?.data))
      
    } catch (error) {
      console.error(error);    
    }
  }
  useEffect(()=>{
    fetchConnections()
  },[])

  if(!connections) return <ShimmerUI/>

  if( connections.length ===0) return <h1 className='text-2xl text-center font-bold my-10'>NO CONNECTION FOUND!</h1>

  return (
    <div>
        <h1 className='text-4xl font-bold text-center my-7'>Connections</h1>
      <div className='text-gray-700 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        
          {connections.map((user)=>(
          <div key={user._id} className='shadow-lg flex gap-5 mx-auto items-center border border-gray-300 m-2 p-2 rounded-lg'>
            <div>
              <img src={user.photoURL} className="w-20 h-20 rounded-full" alt="img" />
            </div>
            <div>
              <h1 className='font-semibold'>{user.firstName} {user.lastName}, <span className='font-normal'>{user.age}</span></h1>
              <p>{user.gender}</p>
              <p className='font-semibold'>skills: <span className='text-gray-700 font-normal'>{user.skills}</span></p>
            </div>
          
          </div>
          
        ))}
      </div>
    </div>
  )
}

export default Connection