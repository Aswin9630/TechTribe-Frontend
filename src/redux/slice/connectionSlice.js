import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name:"connections",
    initialState:{
        connections:[]
    },
    reducers:{
        addConnections : (state,action) => {
            state.connections = action.payload
        },
        removeConnection : ( state, action) => {
            return null;
        }
    }
})

export const { addConnections, removeConnection } = connectionSlice.actions
export default connectionSlice.reducer