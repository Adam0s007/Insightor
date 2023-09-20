
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status:''
}

const authStatusSlice = createSlice({
    name: 'authStatus',
    initialState: initialState,
    reducers: {
        updateState: (state,action)=> {
         Object.assign(state, action.payload);
        },
        removeState: (state)=>{
            state = initialState;
        }
    }
    });

export const { updateState, removeState } = authStatusSlice.actions;

export default authStatusSlice;