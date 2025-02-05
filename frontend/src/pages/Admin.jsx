import React from 'react'
import { useState } from 'react';

const Admin = () => {


  
  return (
    <div className='h-[400px] '>
    <div >
      <h1 className='text-5xl ml-6 font-bold p-2 rounded-md text-center '>
        Dashboard
      </h1>
       <div className='flex ml-3 p-3 justify-evenly'>
        <div className='border-2 border-gray-600 bg-slate-200 w-[310px] h-[200px] p-2 rounded-xl shadow-md'>
        <p className='ml-7 text-center font-bold text-2xl  text-blue-600  '>Users</p>
        </div>

        <div className='border-2 border-gray-600 bg-slate-200 w-[310px] h-[200px] p-2 rounded-xl shadow-md'>
        <p className='ml-7 text-center font-bold text-2xl text-amber-600 '>Authorized User</p>
        </div>

        <div className='border-2 border-gray-600 bg-slate-200 w-[310px] h-[200px] p-2 rounded-xl shadow-md'>
        <p className='ml-7 text-center font-bold text-2xl  text-gray-700'>Unauthorized User</p>
        </div>
       </div>
    </div>
    </div>
  )
}

export default Admin;