"use client"
import Header from '@/common/components/header'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })


export default function userLayout({ children }) {
return (
        <>
            <div className='h-screen'>
            {/* <Header /> */}
            {children}
                
            </div>
        </>

    )

}