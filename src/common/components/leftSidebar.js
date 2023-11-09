"use client"
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedTab } from '@/store/features/activeTab/activeTabSlice';
import { useRouter } from 'next/navigation'
import { getAllTask, isUpdateModeChange } from '@/store/features/task/taskSlice';
import { getUser } from '@/store/features/users/userSlice';
import { usePathname } from 'next/navigation';



const LeftSideBar=()=>{
const getActiveTab = useSelector((state) => state.activeTab.activeTab)
const userData=useSelector((state)=>state.userData.userData)
//const createTaskStatus = useSelector((state) => state.activeTab.createTaskStatus)
const path=usePathname()
console.log('userId',userData)
const dispatch = useDispatch()
const router=useRouter()
  
//const [activeTab,setActiveTab]=useState("All Tasks")
const [allTabs,setAllTabs]=useState(["All Tasks","Pending Tasks","Inprogress Tasks","Completed Tasks","Add New Task","Profile"])
const handleTabChange=async(givenTab)=>{
    dispatch(setSelectedTab(givenTab));
    if(givenTab=="Add New Task"){
        dispatch(isUpdateModeChange(false))
    }
    // else{
    //    getData(givenTab)
    // }
    let queryRoute=givenTab
    router.push(queryRoute.replace(/ /g,'_'));
}

const getData= async(givenTab)=>{
    console.log('g tab',givenTab)
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
        console.log('g tab',givenTab)

        await dispatch(getUser(userId))
    }
    else{
        queryTab="inprogress"
    }
 await dispatch(getAllTask(queryTab))

}

useEffect(()=>{
//   if(getActiveTab=="All Tasks"){
//   dispatch(getAllTask('allTasks'))
//   }
let givenPath=(path.replace(/_/g,' ')).substring(1)
if(givenPath!=='Profile' || givenPath!=='Add New Task'){
dispatch(setSelectedTab((path.replace(/_/g,' ')).substring(1)));
getData(givenPath)

}


},[])
console.log('active tab',getActiveTab,path.substring(1))
    return(
        <>
        <div className="container   bg-white shadow-2xl rounded-lg font-semibold mt-6 text-violet-600 pb-5 pt-4 outline-4 border-gray-300 border">
            {
                allTabs.map((item)=>(
                    <div className={`py-2 pl-3 cursor-pointer ${item==getActiveTab && getActiveTab!==null ?'bg-violet-600 text-white rounded-2xl':''}`} onClick={()=>handleTabChange(item)}>{item}</div>

                ))
            }
        
        </div>
 </>
    )
}

export default LeftSideBar;