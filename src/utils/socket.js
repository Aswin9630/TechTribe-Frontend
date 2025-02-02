import io from "socket.io-client"
import { BACKEND_URL } from "./constants"


export const createSocketConnection = ()=>{
    if(location.hostname === "localhost"){

        return io(BACKEND_URL);
    }else{
        return io(BACKEND_URL, {path:"/socket.io"});
    }
}