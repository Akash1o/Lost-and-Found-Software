import React from 'react'
import lo from '../images/lo.png';
import search from '../images/search.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
  const[navHandle ,setNavHandle] =useState('')
  const Navigate = useNavigate();
  const handleNavigation = (path)=>{
    setNavHandle(path)
    Navigate(path)
  }

  return (
    <div className='flex flex-row justify-start items-center pl-[385px] pb-[87px] bg-gradient-to-br from-pink-100 to-yellow-100 '>
      
       <div className='flex flex-col mt-[34px] '>
        <h1 className='text-7xl font-heading text-green-500'>Find &</h1>
        <h1 className='text-7xl font-heading text-blue-700'>Recover </h1>
        <h1 className='text-7xl font-heading text-black'>With Ease</h1>
        <p className='text-sm font-bold text-pink-500'>Experience effortless recovery with our dedicated lost and found service.</p>
       </div>

       <div className='pl-[114px] flex flex-col gap-3 '>
       <div className='flex flex-row w-[180px] h-[72px] rounded-md border-black gap-3 justify-start pb-2 cursor-pointer hover:bg-orange-500
        ' style={{background: 'linear-gradient(to right, #991313 0%, #FF1F1F 75%)'}} onClick={() =>handleNavigation('/lost')}>
        <h1 className='text-3xl text-white font-heading pt-[34px] pl-3'>Lost</h1>
        <img src={lo} alt="lostPhoto" className='w-20 h-20 ' />
       </div>

       <div className='flex flex-rowrounded-sm items-center rounded-md w-[180px] h-[72px] border-black gap-3 justify-start pb-2 cursor-pointer hover:bg-red-500  '
       style={{background:'linear-gradient(to right,#00CB14 0%, #00650A 75%)'}}
       onClick={() =>handleNavigation('/found')}
       >
        <h1 className='text-2xl font-heading text-white pt-[34px] pl-3'>Found</h1>
        <img src={search} alt='searchOption' className='w-20 h-20 ' />
       </div>

       </div>
    </div>
  )
}

export default Home
