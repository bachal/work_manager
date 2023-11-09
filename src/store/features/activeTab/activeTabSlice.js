'use client'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeTab: null,
}

export const activeTabSlice = createSlice({
  name: 'activeTab',
  initialState,
  reducers: {
    setSelectedTab: (state,action) => {
      state.activeTab = action.payload
    }
    },
})
export const {setSelectedTab } = activeTabSlice.actions
export default activeTabSlice.reducer