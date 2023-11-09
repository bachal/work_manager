'use client'
import ModalPopUp from "@/common/components/modal";
import { useEffect, useState } from 'react';
import AddEditTask from "@/common/components/addEditTask";
import TaskComponent from "@/common/components/taskComponent";
import { useSelector, useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { setSelectedTab } from '@/store/features/activeTab/activeTabSlice';
import Profile from "@/common/components/profile";
import Skeleton from '@mui/material/Skeleton';
import Loading from "../../common/components/loading";



const UpdatePopUp = () => {
  return (<>
    <AddEditTask />
  </>)
}



export default function Tasks(props) {
  const dispatch = useDispatch()
  const activeTab = useSelector((state) => state.activeTab.activeTab)
  const allTasks = useSelector((state) => state.tasks.allTasks)
  console.log('all task here', activeTab)
  
  return (
    <>

      <ModalPopUp >
        <UpdatePopUp />
      </ModalPopUp>
      <div className="font-extrabold flex justify-center  -mt-5 text-violet-600">{activeTab.replace(/_/g, ' ')}</div>
      <div className="mt-3">
        {activeTab && activeTab == 'Add New Task' ?
          <div className=" pl-3 pr-3 pb-5">
            <div className="w-full shadow-2xl rounded-2xl p-3 border-gray-300 border">
              <AddEditTask />
            </div>
          </div>
          :
          activeTab  && activeTab== 'Profile' ?

          
            <Profile /> :
            <div className="pb-5">
              {allTasks.length > 0 ? allTasks.map((task,index) => (
                <TaskComponent task={task} key={index} title={task.title} content={task.content} created={task.created} status={task.status} completed={task.completed} />

              ))

                :(<></>)
                }

            </div>
        }
      </div>

    </>
  )
}
