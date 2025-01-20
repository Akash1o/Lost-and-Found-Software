import React, { useState } from "react";
import lost from "../images/lost.png";
import { useNavigate } from "react-router-dom";
import { GiCrossedSabres } from "react-icons/gi";


const Nav = () => {
  const[popUp,setPopUp]=useState(false)
    const[navstate,setNavstate]=useState("")
    const navigate=useNavigate()

    const handlePopUp=()=>{
      setPopUp(!popUp);
    }
const handleCross=()=>{

  setPopUp(false);
}
    const handleNavigate=(path)=>{
        setNavstate(path)
        navigate(path)
    }
  return (
    <div className="flex justify-between p-2 border-b-2 border-gray-300 items-center relative ">
      <div className="flex cursor-pointer " onClick={()=>handleNavigate('/')}>
        <div>
          <img src={lost} alt="logo" className="w-10 h-10 four:w-12 four:h-12" />
        </div>

        <div>
          <span className="font-bold text-xl four:text-2xl">Saman Khoji </span>
          <p className="">Discover.Connect.Reclaim</p>
        </div>
      </div>


      <div className="block lg:hidden">
    
<svg width="32" height="20" className="hover:cursor-pointer" onClick={handlePopUp}  viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.25 19.5V16.3333H31.75V19.5H0.25ZM0.25 11.5833V8.41667H31.75V11.5833H0.25ZM0.25 3.66667V0.5H31.75V3.66667H0.25Z" fill="#1D1B20"/>
</svg>

      </div>

      <div className="absolute top-[80px] right-4 ">
        {popUp ? <div className="bg-white p-2 rounded-md">  <ul className="flex flex-col gap-4 p-2 items-center relative">
          <li className="absolute right-0 cursor-pointer" onClick={handleCross}><GiCrossedSabres /></li>
            <li className=" hover:border-b-2 hover:border-green-400 p-1 rounded-sm cursor-pointer" onClick={()=>handleNavigate('/')}>Home</li>
            <li className="hover:border-b-2 hover:border-green-400 p-1 rounded-sm cursor-pointer" onClick={()=>handleNavigate('/lost')}>Lost</li>
            <li className="hover:border-b-2 hover:border-green-400 p-1 rounded-sm cursor-pointer" onClick={()=>handleNavigate('/reportlost')}>Report Lost</li>
            <li className=" hover:border-b-2 hover:border-green-400 p-1 rounded-sm cursor-pointer" onClick={()=>handleNavigate('/found')}>Found</li>
            <li className="hover:border-b-2 hover:border-green-400 p-1 rounded-sm cursor-pointer" onClick={()=>handleNavigate('/reportfound')}>Report Found</li>
            <li className=" hover:border-b-2 hover:border-green-400 p-1 rounded-sm cursor-pointer" onClick={()=>handleNavigate('/profile')}>Profile</li>
        </ul></div>:""}
      </div>

      <div className="hidden lg:block">
        <ul className="flex gap-4 p-2 items-center">
            <li className=" hover:border-b-2 hover:border-green-400 p-1 rounded-sm cursor-pointer" onClick={()=>handleNavigate('/')}>Home</li>
            <li className="hover:border-b-2 hover:border-green-400 p-1 rounded-sm cursor-pointer" onClick={()=>handleNavigate('/lost')}>Lost</li>
            <li className=" hover:border-b-2 hover:border-green-400 p-1 rounded-sm cursor-pointer" onClick={()=>handleNavigate('/reportlost')}>Report Lost</li>
            <li className="hover:border-b-2 hover:border-green-400 p-1 rounded-sm cursor-pointer" onClick={()=>handleNavigate('/found')}>Found</li>
            <li className=" hover:border-b-2 hover:border-green-400 p-1 rounded-sm cursor-pointer" onClick={()=>handleNavigate('/reportfound')}>Report Found</li>
            <li className="hover:border-b-2 hover:border-green-400 p-1 rounded-sm cursor-pointer" onClick={()=>handleNavigate('/profile')}>Profile</li>
        </ul>
      </div>

      <div className="p-2 items-center ">
      <button className=" hover:bg-red-500 mr-3  rounded-sm p-1" onClick={()=>handleNavigate('/create')}>Log In</button>
        <button className=" rounded-sm hover:bg-gray-400 p-1" onClick={()=>handleNavigate('/logout')}>Sign Out</button>
      </div>

    </div>
  );
};

export default Nav;
