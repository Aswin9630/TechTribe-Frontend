import React, {  useEffect, useRef, useState } from 'react'
import {  Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import useFetchUser from '../hooks/useFetchUser';
import { createSocketConnection } from '../utils/socket';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import ShimmerUI from "./ShimmerUI"

const Chat = () => {
  const scrollToBottomRef = useRef();
  const toUserId = useParams();
  const targetUser = toUserId.userId;
  const targetUserId = targetUser.replace(":","")

  const [message,setMessage] = useState([]); 
  const [newMessage,setNewMessage] = useState(""); 
  const [targetUserDetails, setTargetUserDetails] = useState("");
  const [loading, setLoading] = useState(true)  
    
  
  useFetchUser()
  const users = useSelector((store)=>store.user)
  const userId = users?.user?._id
  const firstName = users?.user?.firstName
  

  useEffect(()=>{
    if(!users?.user){
      return;
    }
    const socket = createSocketConnection();

    socket.emit("join",{ firstName, userId, targetUserId });
    socket.on("messageReceived",({ firstName, text })=>{
      setMessage((messages)=>[...messages, { firstName, text }])
    });
    socket.on("targetUserDetails",({targetUserDetails})=>{      
      setTargetUserDetails(targetUserDetails);   
      setLoading(false) 
    })

    return ()=>{
      socket.disconnect();
    }
  }, [userId, targetUserId])

  useEffect(()=>{
    if (!targetUserId) return;
    fetchChatMessage();
  },[targetUserId])

  useEffect(()=>{
    scrollToBottom()
  },[scrollToBottomRef])
  
  const scrollToBottom = ()=>{
    if (scrollToBottomRef.current) {
      scrollToBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  const handleSendMessage = ()=>{
    const socket = createSocketConnection()
    socket.emit("sendMessage",{ firstName , userId, targetUserId , text:newMessage })
    setNewMessage("")
  }

  const fetchChatMessage = async()=>{
    try {
      const response = await axios.get(`${BACKEND_URL}/chat/${targetUserId}`, { withCredentials:true });
      const data = response?.data?.chat?.message || [];
      const chatMessage = data.map((msg)=>{
        return {
          firstName:msg?.senderId?.firstName || "unknown",
          text:msg.text
        }
      })
      setMessage(chatMessage)
    } catch (error) {
      console.error(error)
    }
  }

  if(loading) return <ShimmerUI/>
  
  return  (
    <>
      <h1 className='mt-5 text-3xl lg:text-4xl font-bold text-center font-serif'>Say Hello to <span className='uppercase underline text-yellow-400'>{targetUserDetails?.firstName} !</span></h1>
    <div className='flex flex-col lg:gap-3 lg:flex-row m-5'>
      <div className=' flex justify-between mx-12 lg:mx-auto border border-yellow-500 rounded-lg px-2 py-3 lg:w-1/3 my-5 font-sans'>
        <div>
          <img className='w-12 h-12 lg:w-16 lg:h-16 rounded-lg' src={targetUserDetails?.photoURL} alt="profile-image" />
            <h2 className='font-semibold'>{targetUserDetails?.firstName+" "+targetUserDetails?.lastName}</h2>
            <p>{targetUserDetails?.email}</p>
        </div> 
          <Link to="/connections"><button className='font-bold tracking-tighter border hover:bg-gray-900 hover:text-yellow-400 border-yellow-800 px-2 py-1 rounded-lg'>BACK</button></Link>
      </div>

      <div className='border min-h-screen lg:m-5 w-3/3 lg:w-2/3 lg:mx-auto rounded-lg border-yellow-500 relative flex flex-col'>
        <div className='flex-1 overflow-y-auto p-4 max-h-[80vh]'>
          {
            message.map(( msg, userId)=>{
              return (
                <div key={userId} >
                <div className={"chat py-2 " + (firstName === msg.firstName ? "chat-end" : "chat-start" )}>
                  <div className="chat-image avatar chat-header text-xs">
                    {msg.firstName}
                  </div>
                  <div className="chat-bubble">{msg.text}</div>
                </div>
                <div ref={scrollToBottomRef}/>
              </div>
              )
            })
          }
        </div>

         <div className='absolute bottom-0 left-0 w-full p-4 border-t border-gray-500 flex flex-row'>
          <input type="text" value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} className='outline-none w-2/3 border border-gray-500 p-2 rounded-lg' placeholder='say hello...'/>
          <button onClick={handleSendMessage} className='w-1/3 border px-4 py-2 bg-amber-600 text-white font-semibold rounded-lg ml-2'>Send</button>
        </div>
      </div>

    </div>
    </>
  )
}

export default Chat