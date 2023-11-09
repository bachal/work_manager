'use client';
import React, { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux'
import { createTask, updateTask } from '@/store/features/task/taskSlice';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { modalOpen } from '@/store/features/modal/modalSlice';





export default function AddEditTask() {
    const dispatch = useDispatch()
    const getActiveTab = useSelector((state) => state.activeTab.activeTab)
    const isUpdateMode = useSelector((state) => state.tasks.isUpdateMode)
    const updatingTask = useSelector((state) => state.tasks.updatingTask)

    const [task, setTask] = useState({ 'title': '', content: '', userId: "64de0337950ec56cdd80d667", status: "", created: null, completed:null,titleError: "", contentError: "", statusError: "" });
    const handleTask = (e) => {
        let key = e.target.name
        setTask({ ...task, [key]: e.target.value })
    }

    const addTaskCall = async () => {
        if(task.completed==null){
            delete task.completed
        }
        const taskAdded = await dispatch(createTask(task))
        const { payload: responseData } = taskAdded
        if (responseData.status == 201 && responseData.success) {
            toast.success("Task has been created!", {
                position: toast.POSITION.TOP_CENTER
            });
            setTask({ ...task, title: '', content: '', userId: "64de0337950ec56cdd80d667", status: "", created: null,completed:null, titleError: "", contentError: "", statusError: "" })
        }
    }
    const handleAddUpdateTask = async(e) => {
        e.preventDefault();
        if (getActiveTab == "Add New Task") {
            addTaskCall();
        }
        else {
            let payload = task
            delete payload["titleError"];
            delete payload["contentError"];
            delete payload['statusError']
            if(payload['status']!=='completed'){
                payload['completed']=null
            }
            console.log('py',payload)
            // if(payload.completed==null){
            //     delete payload['completed']
            // }
            payload['id'] = updatingTask._id
            const taskUpdated = await dispatch(updateTask(payload))
            const { payload: responseData } = taskUpdated

            if (responseData.status == 201 && responseData.success) {
                toast.success("Task has been updated!", {
                    position: toast.POSITION.TOP_CENTER
                });
                dispatch(modalOpen(false))
                setTask({ ...task, title: '', content: '', userId: "64de0337950ec56cdd80d667", status: "", created: null, titleError: "", contentError: "", statusError: "",completed:null })
            }

        }
    }

    useEffect(() => {
        if (isUpdateMode) {
            const { title, content, status, created,completed } = updatingTask
            console.log('created', updatingTask)
            setTask({ ...task, title: title, content: content, userId: "64de0337950ec56cdd80d667", status: status, created: created==""?null:created,completed:completed==""?null:completed, titleError: "", contentError: "", statusError: "" })
            // setTask({ ...task, title:title, titleError: "", contentError: "", statusError: "" })


            console.log('update mode', updatingTask)
        }

    }, [isUpdateMode])

    return (
        <>
            <div className='pl-3 pr-3 w-full'>
                <Form onSubmit={(e) => handleAddUpdateTask(e)}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Task Title</Form.Label>
                        <Form.Control name="title" value={task.title} type="text" size="sm" placeholder="" onChange={(e) => handleTask(e)} />
                        <div className='text-red-700'>{task.titleError}</div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control name="content" value={task.content} size="sm" as="textarea" rows={3} onChange={(e) => handleTask(e)} />
                        <div className='text-red-700'>{task.contentError}</div>

                    </Form.Group>
                    <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                        <Form.Label>Status</Form.Label>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="status"
                            className='-mt-3'
                            onChange={(e) => handleTask(e)}
                            value={task.status}

                        >
                            <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                            <FormControlLabel value="inprogress" control={<Radio />} label="Inprogress" />
                           {isUpdateMode && (<FormControlLabel value="completed" control={<Radio />} label="completed" />)}
                        </RadioGroup>
                        <div className='text-red-700'>{task.statusError}</div>

                    </Form.Group>
                    <div className="justify-start">
                        <div className='mb'>
                            <Form.Label className='mb-2'>{getActiveTab == 'Add New Task' ? 'Create Date' : 'Created'}</Form.Label><br />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    slotProps={{ textField: { size: 'small' } }}
                                    onChange={(value) => setTask({ ...task, created: value.$d })}
                                    value={task.created!==null?dayjs(task.created):null}
                                />
                            </LocalizationProvider>
                        </div>
                        {task.status=="completed" && isUpdateMode && (<div className="mt-1">
                        <Form.Label>Completed</Form.Label><br />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                slotProps={{ textField: { size: 'small' } }}
                                onChange={(value) => setTask({ ...task, completed: value.$d })}
                                value={task.completed !==null?dayjs(task.completed):null}

                                />
                                
                        </LocalizationProvider>
                    </div>)}
                    </div>

                    <div className="flex justify-center mt-2">
                        <Button variant="contained" size="small" style={{ backgroundColor: '#9f50e6' }} type="submit">
                            Update
                        </Button>

                    </div>
                </Form>

            </div>
        </>
    )
}
