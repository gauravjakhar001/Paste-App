import { createSlice } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast';

const initialState = {
  pastes:localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes"))
  :[]
}

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      const paste = action.payload;

      //add a check -> Paste already 
      // exist wala case 
      state.pastes.push(paste);
      localStorage.setItem("pastes",
        JSON.stringify(state.pastes));

        toast.success("Paste Created Successfully")
      
    },

    updateToPastes: (state,action) => {
      const paste  = action.payload;
      const index = state.pastes.findIndex ((item )=>item._id ===paste._id);
      
      if(index>=0){
        state.pastes [index] =paste;

        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Updated");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem('pastes');
    },
    removeFromPastes :(state,action) => {

      const pasteId = action.payload;

      console.log(pasteId);
      const index = state.pastes.findIndex((item)=>item._id ===pasteId);
      
      if(index>=0){
        state.pastes.splice(index,1);

        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Deleted");
      }
      
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes,removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer
