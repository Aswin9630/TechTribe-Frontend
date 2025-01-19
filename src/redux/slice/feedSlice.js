import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeedUsers:(state,action)=> action.payload,
        removeFeedUsers:(state,action)=>{
            return null
        }
        
    },
})


export const { addFeedUsers, removeFeedUsers } = feedSlice.actions
export default feedSlice.reducer;