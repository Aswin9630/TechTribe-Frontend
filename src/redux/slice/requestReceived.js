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
        removeRequest : ( state, action) => {
          state.requests = state.requests.filter(req=>req._id !==action.payload)
        }
    }
})

export const { addrequests, removeRequest } = requestReceivedSlice.actions
export default requestReceivedSlice.reducer