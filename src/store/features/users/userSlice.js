import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { httpAxios } from '@/helper/httpAxios'


const initialState = {
  userData: null,
}

export const getUser = createAsyncThunk(
  'task/getUser',
  async (userId,thunkAPI) => {
   //const response= await httpAxios.get(`/api/users/64de0337950ec56cdd80d667`)
    //const response= await httpAxios.get(`/api/users/64df956d5492ecd5b735431d`)
    const response= await httpAxios.get(`/api/users/${userId}`)

    const result = response.data;
   return result
  }
)

export const updateUser = createAsyncThunk(
  'task/updateUser',
  async (userObj,thunkAPI) => {
    let userId=userObj['userId']
    delete userObj.userId
   const response= await httpAxios.put(`/api/users/${userId}`,userObj)
    //const response= await httpAxios.get(`/api/users/64df956d5492ecd5b735431d`)
    const result = response.data;
   return result
  }
)

export const addUser=createAsyncThunk(
 'user/addUser',
 async(obj)=>{
  const response=await httpAxios.post('/api/users',obj) 
  const result = response.data;
   return result
 }

)

export const userLogIn=createAsyncThunk(
  'user/userLogin',
  async(obj)=>{
   const response=await httpAxios.post('/api/login',obj) 
   const result = response.data;
    return result
  }
 
 )
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
 extraReducers: (builder) => {
  builder.addCase(getUser.pending, (state, action) => {
    console.log('called11')
    state.isLoading=true
  }),
  builder.addCase(getUser.fulfilled, (state, action) => {
    console.log('called11')
    state.userData=action.payload.data
    state.isLoading=false
  }),
  builder.addCase(updateUser.pending,(state,action)=>{
    state.isLoading=true;
  }),
  builder.addCase(updateUser.fulfilled,(state,action)=>{
    state.isLoading=false;
    state.userData=action.payload.data
  }),
  builder.addCase(addUser.pending,(state,action)=>{
    state.isLoading=true;
  }),
  builder.addCase(addUser.fulfilled,(state,action)=>{
    state.isLoading=false;
  }),
  builder.addCase(userLogIn.pending,(state,action)=>{
    state.isLoading=true;
  }),
  builder.addCase(userLogIn.fulfilled,(state,action)=>{
    state.isLoading=false;
    state.userData=action.payload.userData
  })
},
})


//export const {} = getUser.actions

export default userSlice.reducer