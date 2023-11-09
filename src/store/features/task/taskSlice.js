import { httpAxios } from '@/helper/httpAxios'
import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  taskData: [],
  allTasks:[],
  createTaskStatus:false,
  isLoading:false,
  isUpdateMode:false,
  updatingTask:null
}

export const createTask = createAsyncThunk(
    'task/add',
    async (data, thunkAPI) => {
      const response= await httpAxios.post('/api/works',data)
      const result = response.data;
     return result
    }
  )

  export const getAllTask = createAsyncThunk(
    'task/getAll',
    async (taskStatus, thunkAPI) => {
      console.log('get call')
      const response= await httpAxios.get(`/api/works?taskStatus=${taskStatus}&&userId=64de0337950ec56cdd80d667`)
      const result = response.data;
     return result
    }
  )
  export const updateTask = createAsyncThunk(
    'task/update',
    async (obj,thunkAPI) => {
      let updateReqId=obj.id
      delete obj['id']
      const response= await httpAxios.put(`/api/works/${updateReqId}`,obj)
      const result = response.data;
     return result
    }
  )

  export const deleteTask = createAsyncThunk(
    'task/delete',
    async (taskId,thunkAPI) => {
     const response= await httpAxios.delete(`/api/works/${taskId}`)
      const result = response.data;
     return result
    }
  )

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    isUpdateModeChange:(state, action) => {
      state.isUpdateMode = action.payload
    },
    updatingTask:(state, action) => {
      state.updatingTask = action.payload
    },
   
  },
  extraReducers: (builder) => {
    builder.addCase(createTask.pending, (state, action) => {
      console.log('called11')
      state.createTaskStatus=false
      state.isLoading=true
    }),
    builder.addCase(createTask.fulfilled, (state, action) => {
      console.log('called22')

      state.createTaskStatus=true
      state.isLoading=false

    }),
    builder.addCase(getAllTask.pending, (state, action) => {
      console.log('called44')
      state.isLoading=true
    }),
    builder.addCase(getAllTask.fulfilled, (state, action) => {
      console.log('called33',action.payload.data)
      state.allTasks=action.payload.data
      state.isLoading=false

    }),
    builder.addCase(updateTask.pending, (state, action) => {
      console.log('called444')
      state.isLoading=true
    }),
    builder.addCase(updateTask.fulfilled, (state, action) => {
      console.log('called333',action.payload.data)
      state.allTasks=action.payload.data
      state.isLoading=false

    }),
    builder.addCase(deleteTask.pending, (state, action) => {
      console.log('called444444')
      state.isLoading=true
    }),
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      console.log('called33333333',action.payload.data)
      state.allTasks=action.payload.data
      state.isLoading=false

    })
  },
})

// Action creators are generated for each case reducer function
export const {isUpdateModeChange,updatingTask} = taskSlice.actions

export default taskSlice.reducer