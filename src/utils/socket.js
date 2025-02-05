import io from "socket.io-client"
import {BACKEND_URL} from "./constants"


export const createSocketConnection = ()=>{
     if(location.hostname === "localhost"){
          return io(BACKEND_URL)
     }
     return io("https://thetechtribe.xyz", { path: "/api/socket.io" }),

    { transports: ["websocket", "polling"]} ,

     { withCredentials:true }
}