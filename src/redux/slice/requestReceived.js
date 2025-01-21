import { createSlice } from "@reduxjs/toolkit";

const requestReceivedSlice = createSlice({
    name:"requests",
    initialState:{
        requests:[]
    },
    reducers:{
        addrequests : (state,action) => {
            state.requests = action.payload
        },
        removeConnection : ( state, action) => {
            return null;
        }
    }
})

export const { addrequests, removeConnection } = requestReceivedSlice.actions
export default requestReceivedSlice.reducer