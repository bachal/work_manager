'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { modalOpen } from "@/store/features/modal/modalSlice";
import { isUpdateModeChange, updatingTask } from '@/store/features/task/taskSlice';
import moment from 'moment';
import { deleteTask } from '../../store/features/task/taskSlice';
import { toast } from 'react-toastify';


export default function TaskComponent(props) {
  const dispatch = useDispatch()
  console.log('props', props)
  const updateTask = (givenTask) => {
    dispatch(isUpdateModeChange(true))
    dispatch(updatingTask(givenTask))
    dispatch(modalOpen(true))
  }

  const taskDelete = async (task) => {
    const taskDeleted = await dispatch(deleteTask(task._id))
    const { payload: responseData } = taskDeleted
    if (responseData.status == 201 && responseData.success) {
      toast.success("Task has been Deleted!", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  return (
    <>
      <div className=" pl-3 pr-3 mt-3">
        <div className="w-full shadow-md  rounded-lg p-3 border-gray-300 border">
          <div className="font-semibold flex justify-between" >
            <div>{props.title}</div>
            <div className="flex">
              <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-6 h-6 cursor-pointer" onClick={() => taskDelete(props.task)}>
                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
              </svg>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 cursor-pointer" onClick={() => updateTask(props.task)}>
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>

              </div>
            </div>
          </div>
          <div className="font-thin py-3  border-b-2 border-indigo-500/100">{props.content}</div>
          <div className="flex justify-between pt-2 pb-1">
            <div className="flex">
              <div>Created :</div>
              <div className="font-light">{moment(props.created).format('DD/MM/YYYY')}</div>
            </div>
            {props.status == "completed" && (<div className="flex">
              <div>Completed :</div>
              <div className="font-light">{moment(props.completed).format('DD/MM/YYYY')}</div>
            </div>)}
            <div className="flex">
              <div>Status :</div>
              <div className={`font-light rounded-lg p-1 text-xs ml-1  ${props.status == "pending" ? 'bg-indigo-600 text-white' : props.status == "inprogress" ? 'bg-yellow-300 text-black' : 'bg-green text-black'}`}>{props.status}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
