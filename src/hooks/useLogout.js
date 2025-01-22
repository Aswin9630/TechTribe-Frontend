import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { removeFeedUser } from "../redux/slice/feedSlice";

const useLogout = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()

const handleLogOut = async () => {
        try {
           await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,{},
            { withCredentials: true }
          );
          dispatch(removeUser())
          dispatch(removeFeedUser())
          return navigate("/login")
    
        } catch (error) {
          console.error(error);      
        }
      };

      return handleLogOut;
}

export default useLogout;