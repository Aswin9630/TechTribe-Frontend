import axios from "axios";
import ShimmerUI from "./ShimmerUI";
import { useDispatch } from "react-redux";
import { removeFeedUser } from "../redux/slice/feedSlice";

const UserCard = ({user,showActions}) => {  
  const dispatch = useDispatch()
  if(!user ) return <ShimmerUI/>

  const {_id,firstName,lastName,photoURL,designation} = user || user?.user;

  const handleconnectionRequest =async (status,userId)=>{
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/request/send/${status}/${userId}`,{},{withCredentials:true})  
      console.log("res",response);
      
      dispatch(removeFeedUser(userId))
    } catch (error) {
      console.error(error);
      
    }
  }
   
  return (
    <div className="">
      <div className="card bg-gray-100 w-96 shadow-2xl rounded-xl">
        <figure className="px-3 pt-5">
          <img
            src={photoURL}
            alt="user-image"
            className="rounded-2xl h-52 w-72 object-cover"
          />
        </figure>
        <div className="card-body items-center text-center text-slate-600">
          <h2 className="card-title font-bold">{firstName+" "+lastName}</h2>
          <p className="font-semibold">{designation}</p>
         { showActions && <div className="card-actions">
           <button onClick={()=>handleconnectionRequest("ignored",_id)} className="btn glass btn-circle bg-yellow-400 hover:bg-red-600 hover:text-white text-white hover:scale-110 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <button onClick={()=>handleconnectionRequest("interested",_id)} className="btn glass btn-circle bg-orange-500  hover:bg-green-700 hover:text-white text-white hover:scale-110 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>}
        </div>
      </div>
    </div>
  )
};

export default UserCard;
