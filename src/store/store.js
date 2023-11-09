"use client";
import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './features/modal/modalSlice';
import activeTabSlice from './features/activeTab/activeTabSlice';
import taskSlice from './features/task/taskSlice';
import userSlice from './features/users/userSlice';
export const store = configureStore({
  reducer: {
  modalAction:modalSlice,
  activeTab:activeTabSlice,
  tasks:taskSlice,
  userData:userSlice
    
  },
})