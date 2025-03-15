import React from 'react'
import lo from '../images/lo.png';
import search from '../images/search.png';
import { useNavigate } from 'react-router-dom';
import photo from "../images/3photo.png";

const Home = () => {

  const Navigate = useNavigate();
  const handleNavigation = (path)=>{

    Navigate(path)
  }

  return (
    <div className=' bg-gradient-to-br from-pink-100 to-yellow-100'>

   
    <div className='flex flex-col five:flex-row w-[90%] justify-center items-center mx-auto  '>
     
      <div className='w-full block five:hidden '>
      <div className='w-[90%] mx-auto p-4 rounded-md border-2 border-gray-500'>
<h1 className='font-bold text-2xl mb-2'>Welcome to Our Lost and Found Website!</h1>
<p className='m-2'>We're excited to help you find and recover lost items. Easily report lost belongings, search for found items, and connect with others. Our user-friendly platform aims to reunite you with your lost possessions quickly and efficiently. 
</p>
<p className='m-2'>Thank you for choosing our service. If you need assistance, feel free to contact us.</p>
<p>Happy searching and best of
luck!</p>
      </div>
      </div>

       <div className='flex flex-col mt-[34px] '>
        <h1 className='text-6xl five:text-7xl font-heading text-green-500'>Find &</h1>
        <h1 className='text-6xl five:text-7xl font-heading text-blue-700'>Recover </h1>
        <h1 className='text-6xl five:text-7xl font-heading text-black'>With Ease</h1>
        <div>

        <p className='text-sm font-bold text-pink-500'>Experience effortless recovery with our dedicated lost and found service.</p>
        </div>
       </div>

       <div className=' flex flex-col gap-3 items-center w-[350px] my-5'>
       <div className='flex flex-row w-[180px] h-[72px] items-center pl-2 rounded-md border-black gap-3 justify-start pb-2 cursor-pointer hover:bg-orange-500
        ' style={{background: 'linear-gradient(to right, #991313 0%, #FF1F1F 75%)'}} onClick={() =>handleNavigation('/lost')}>
        <h1 className='text-3xl text-white font-heading'>Lost</h1>
        <img src={lo} alt="lostPhoto" className='w-20 h-20 ' />
       </div>

       <div className='flex flex-row  items-center pl-2 rounded-md w-[180px] h-[72px] border-black gap-3 justify-start pb-2 cursor-pointer hover:bg-red-500  '
       style={{background:'linear-gradient(to right,#00CB14 0%, #00650A 75%)'}}
       onClick={() =>handleNavigation('/found')}
       >
        <h1 className='text-2xl font-heading text-white '>Found</h1>
        <img src={search} alt='searchOption' className='w-20 h-20 ' />
       </div>
       <div className='mt-4 w-[65%] four:w-[90%] five:w-[70%]'>
        <img src={photo} alt="3photo" className='w-full h-[250px] five:h-[150px]' />
       </div>

       </div>
    </div>
    </div>
  )
}

export default Home
