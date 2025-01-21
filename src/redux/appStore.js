import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice"
import feedReducer from "./slice/feedSlice"
import connectionReducer from "./slice/connectionSlice";
import requestReducer from "./slice/requestReceived"

const appStore = configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connections:connectionReducer,
        requests:requestReducer
    }
})

export default appStore