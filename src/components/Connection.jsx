import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../redux/slice/connectionSlice';

const Connection = () => {
  const dispatch = useDispatch()
  const {connections} = useSelector(store=>store.connections)  

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

  if(!connections || connections.length ===0) return <h1 className='text-2xl text-center font-bold my-10'>NO CONNECTION FOUND!</h1>

  return (
    <div className='text-gray-700 flex flex-col'>
      <h1 className='text-4xl font-bold text-center my-7'>Connections</h1>
      
        {connections.map((user)=>(
        <div key={user._id} className='shadow-lg flex justify-evenly mx-auto w-1/3 items-center border border-gray-300 m-2 p-2 rounded-lg'>
          <div>
            <img src={user.photoURL} className="w-24 h-24 rounded-full" alt="img" />
          </div>
          <div>
            <h1 className='font-semibold'>{user.firstName} {user.lastName}</h1>
            <h2>{user.age}</h2>
            <p>{user.gender}</p>
            <p className='font-semibold'>skills: <span className='text-gray-700 font-normal'>{user.skills}</span></p>
          </div>
        
        </div>
        
      ))}
    </div>
  )
}

export default Connection