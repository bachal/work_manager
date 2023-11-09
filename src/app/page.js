"use client";
import { userLogIn } from '@/store/features/users/userSlice';
import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'



export default function Home() {
  const [user, setUser] = useState({ email: "",password: "" })
  const [errors, setErrors] = useState({ email: "",password: "",loginError:"" });
  const [showPass,setShowPass]=useState(false)
  const dispatch=useDispatch();
 const router=useRouter()
  const setUserData = (e) => {
    let key = e.target.name
    setUser({ ...user, [key]: e.target.value })
  }

  const submitUser=async(e)=>{
    e.preventDefault();
    setErrors({...errors,loginError:""})

    const userLogged=await dispatch(userLogIn(user))

     const { payload: responseData } = userLogged
           if (responseData.status == 201 && responseData.success) {
                setUser({...user,email: "",password: ""})
                setErrors({...errors,loginError:""})


                router.push('/all_Tasks')
            }
            else{
             setErrors({...errors,loginError:responseData.message})
            }


  }

  return (
    <>
     <div className='flex justify-center mt-5'>
        <div className='w-1/2  grid rounded-3xl py-3 px-5 shadow-2xl border-gray-300 border' >
          <div className='justify-self-center'>Login</div>

          <form class="w-full pt-2" onSubmit={(e)=>submitUser(e)}>
            <div className='ml-2 pb-1'>Email </div>
            <div class="flex items-center border-b border-violet-600">
              <input class={`appearance-none bg-transparent border-none w-full mr-3 px-2 leading-tight focus:outline-none `} name="email" type="text" placeholder="" aria-label="email" value={user.email} onChange={(e) => setUserData(e)} />

            </div>
            <div className='text-red-900'>{errors.email}</div>
             <div className='ml-2 pt-3'>Passowrd </div>
            <div class="flex items-center border-b border-violet-600 py-1">
              <input class={`appearance-none bg-transparent border-none w-full mr-3  px-2 leading-tight focus:outline-none`} name="password" type={showPass ? 'text' : 'password'} placeholder="" aria-label="Full name" value={user.password} onChange={(e) => setUserData(e)} />
              {showPass && (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer" onClick={() => setShowPass(false)}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>)}
              {!showPass && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer" onClick={() => setShowPass(true)}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              )
              }

            </div>
            <div className='text-red-900'>{errors.password}</div>
            <div className='text-red-900 mt-3'>{errors.loginError}</div>

            <div className='flex mt-5 justify-center'>
            <div className=''>
                <button class={`hover:bg-blue-700 text-white font-bold py-0.5 px-6 rounded-full  ${(Object.values(user).every(x => x !== '') && Object.values(errors).every(x => x == '')) ? 'cursor-pointer bg-violet-600' : 'cursor-not-allowed bg-violet-400'}`}>
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  




    </>
  )
}
