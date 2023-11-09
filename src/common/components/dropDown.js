"use client"
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getAllTask, isUpdateModeChange } from '@/store/features/task/taskSlice';
import { getUser } from '@/store/features/users/userSlice';
import { useRouter } from 'next/navigation'
import { setSelectedTab } from '@/store/features/activeTab/activeTabSlice';



export default function DropDown() {
    const [allTabs,setAllTabs]=useState(["All Tasks","Pending Tasks","Inprogress Tasks","Completed Tasks","Add New Task","Profile"])
    const dispatch = useDispatch()
    const router=useRouter()
    const handleTabChange=async(givenTab)=>{
        //setActiveTab(givenTab);
        dispatch(setSelectedTab(givenTab));
       
        if(givenTab=="Add New Task"){
            dispatch(isUpdateModeChange(false))
        }
        else{
           let queryTab="";
            if(givenTab=="Pending Tasks"){
                queryTab="pending"
            }
            else if(givenTab=="Completed Tasks"){
                queryTab="completed"
            }
            else if(givenTab=="All Tasks"){
                queryTab="allTasks"
            }
            else if(givenTab=="Profile"){
    
                dispatch(getUser())
            }
            else{
                queryTab="inprogress"
            }
         await dispatch(getAllTask(queryTab))
    }
        router.push(givenTab);
    }
    
 
    return (
    <>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-xs font-bold mb-2 text-violet-600" for="grid-state">
        Task Type
      </label>
      <div className="relative">
        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-violet-600 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 justify-center font-bold" id="grid-state">
         
          {
                allTabs.map((item)=>(
                    <option className='text-violet-600' onClick={()=>handleTabChange(item)}>{item}</option>

                ))
            }
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    </>
  )
}
