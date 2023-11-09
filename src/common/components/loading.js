'use client';
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';



export default function Loading() {
return (
    <>
    <div className='w-full flex justify-center mt-24 '>
    <CircularProgress sx={{color:"#7c3aed"}}/> 
    </div>
    </>
  )
}
