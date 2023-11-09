'use client'
import { getUser, updateUser } from '@/store/features/users/userSlice';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';



export default function Profile() {
    const userData = useSelector((state) => state.userData.userData)
    const dispatch = useDispatch();
    const [user, setUser] = useState({ firstName: "", lastname: "", email: "", contact: "" })
    const [errors,setErrors]=useState({firstName:"",lastname:"",email:"",contact:""})
    const [allowEdit, setAllowEdit] = useState(false);
    const editAllow = (e) => {
        e.preventDefault();
        setAllowEdit(true)
    }

    const updateUserData = async (e) => {
        e.preventDefault();
        let userObj = user;
        userObj['userId'] = '64df956d5492ecd5b735431d'
        const userUpdate = await dispatch(updateUser(userObj))
        const { payload: responseData } = userUpdate
        if (responseData.status == 201 && responseData.success) {
            toast.success("User has been updated!!", {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    const setUserData = (e) => {
        let key = e.target.name
        setUser({ ...user, [key]: e.target.value })
    }
     
    useEffect(() => {
        if (userData !== null && userData !== undefined) {
            const { firstName, lastname, email, contact } = userData;
            setUser({ ...user, firstName: firstName, lastname: lastname, email: email, contact: contact })
            setAllowEdit(false)

        }
    }, [userData])

    console.log('user data here', userData)
    return (
        <>
            <div className="w-full shadow-2xl rounded-2xl px-3 py-3 border-gray-300 border">
                <div className="grid grid-cols-1 gap-4">
                <div className='flex justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                    <div className='flex justify-center'>
                        
                        <form class="w-full max-w-sm" onSubmit={(e) => updateUserData(e)}>
                            <div className='ml-2 pb-1'>First Name </div>
                            <div class="flex items-center border-b border-violet-600">
                                <input class={`appearance-none bg-transparent border-none w-full mr-3 px-2 leading-tight focus:outline-none  ${allowEdit == false ? 'text-neutral-700 font-bold' : 'text-gray-700 font-normal'}`} name="firstName" type="text" placeholder="" aria-label="Full name" value={user.firstName} disabled={!allowEdit} onChange={(e) => setUserData(e)} />
                                <div className='text-red-700'>{errors.firstName}</div>
                            </div>
                            <div className='ml-2 pt-3'>Last Name </div>
                            <div class="flex items-center border-b border-violet-600 pt-1">
                                <input class={`appearance-none bg-transparent border-none w-full mr-3 px-2 leading-tight focus:outline-none ${allowEdit == false ? 'text-neutral-700 font-bold' : 'text-gray-700 font-normal'}`} name="lastname" type="text" placeholder="" aria-label="Full name" value={user.lastname} disabled={!allowEdit} onChange={(e) => setUserData(e)} />
                            </div>
                            <div className='ml-2 pt-3'>Email </div>
                            <div class="flex items-center border-b border-violet-600 py-1">
                                <input class={`appearance-none bg-transparent border-none w-full mr-3 px-2 leading-tight focus:outline-none ${allowEdit == false ? 'text-neutral-700 font-bold' : 'text-gray-700 font-normal'}`} name="email" type="text" placeholder="" aria-label="Full name" value={user.email} disabled={!allowEdit} onChange={(e) => setUserData(e)} />
                            </div>
                            <div className='ml-2 pt-3'>Contact </div>
                            <div class="flex items-center border-b border-violet-600 py-1">
                                <input class={`appearance-none bg-transparent border-none w-full mr-3  px-2 leading-tight focus:outline-none ${allowEdit == false ? 'text-neutral-700 font-bold' : 'text-gray-700 font-normal'}`} name="contact" type="text" placeholder="" aria-label="Full name" value={user.contact} disabled={!allowEdit} onChange={(e) => setUserData(e)} />
                            </div>
                            <div className='flex mt-5 justify-center'>
                                <div>
                                    <button className="bg-violet-600 hover:bg-blue-700 text-white font-bold py-0.5 px-6 rounded-full" onClick={(e) => editAllow(e)}>
                                        Edit
                                    </button>
                                </div>
                                <div className='pl-2'>
                                    <button class={`hover:bg-blue-700 text-white font-bold py-0.5 px-6 rounded-full  ${allowEdit ? 'cursor-pointer bg-violet-600' : 'cursor-not-allowed bg-violet-400'}`} disabled={!allowEdit}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>




            </div>

        </>
    )
}
