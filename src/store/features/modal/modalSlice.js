import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
}

export const modalSlice = createSlice({
  name: 'modalAction',
  initialState,
  reducers: {
    modalOpen: (state,action) => {
      state.isOpen = action.payload
    }
    },
})
export const { modalOpen } = modalSlice.actions
export default modalSlice.reducer