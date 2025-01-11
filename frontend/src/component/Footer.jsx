import React, { useState } from 'react'
import logo from '../images/lost.png'
import { useNavigate } from "react-router-dom";


const Footer = () => {
    const [navState,setNavState]=useState()
    const navigate=useNavigate()

    const handleNavigate=(path)=>{
        setNavState(path)
        navigate(path)
    }


  return (
    <div className='flex border-t-2 border-gray-400 justify-between '>

        <div>
<img src={logo} alt="logo" className='w-[150px] h-[150px]' />
        </div>

        <div>
            <h3 className='font-bold mt-2'>Site</h3>
            <p onClick={()=>handleNavigate('/lost')} className='cursor-pointer'>Lost</p>
            <p onClick={()=>handleNavigate('/reportlost')} className='cursor-pointer'>Report Lost</p>
            <p>Found</p>
            <p>Report Found</p>

        </div>

        <div>
            <h3 className='font-bold mt-2'>Help</h3>
            <p>Customer Support</p>
            <p>Terms and condition</p>
            <p>Privacy and policy</p>

        </div>

        <div className='flex items-center'>
            <div className='font-bold'>
            <span>&#169; Copyright 2025 Lost and Found</span>
            <span className='block'>All Right Reserved</span>
            </div>
        
        </div>

        <div>
            <h3 className='font-bold mt-2'>Links</h3>
            <p>Linkedin</p>
            <p>Facebook</p>
            <p>You Tube</p>
            <p>About Us</p>

        </div>

        <div> 
            <h3 className='font-bold mt-2'>Contacts</h3>
            <p>Tel:97 978473923</p>
            <p>Email:lostandfound2025@gmail.com</p>

            <div>

            </div>
        </div>
      
    </div>
  )
}

export default Footer
