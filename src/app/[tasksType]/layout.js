"use client"
import DropDown from '@/common/components/dropDown'
import Header from '@/common/components/header'
import LeftSideBar from '@/common/components/leftSidebar'
import { getAllTask } from '@/store/features/task/taskSlice'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { useRouter } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loadings from './loading'


export default function TaskLayout({ children }) {
    const dispatch=useDispatch()
    
// useEffect(()=>{
// dispatch(getAllTask())
// },[])

    return (
        <>
            <div className='h-screen'>
            {/* <Header /> */}
                <div className='w-full hidden md:flex'>
                    <div className='w-[20%] pl-5 pt-5'><LeftSideBar /></div>
                    <div className='w-[80%] pr-5 pt-5 pl-3'>
                        {children}
                        </div>
                </div>
                <div className='w-full block md:hidden'>
                    <DropDown />
                        {children}
                </div>
            </div>
        </>

    )

}