import React, { useState } from "react";
import lost from "../images/lost.png";
import { useNavigate } from "react-router-dom";

const Nav = () => {
    const[navstate,setNavstate]=useState("")
    const navigate=useNavigate()

    const handleNavigate=(path)=>{
        setNavstate(path)
        navigate(path)
    }
  return (
    <div className="flex justify-between p-2 border-b-2 border-gray-300 items-center ">
      <div className="flex ">
        <div>
          <img src={lost} alt="logo" className="w-12 h-12" />
        </div>

        <div>
          <span className="font-bold text-2xl">I FOUND </span>
          <p className="">Discover.Connect.Reclaim</p>
        </div>
      </div>

      <div>
        <ul className="flex gap-4 p-2 items-center">
            <li className=" hover:bg-gray-400 p-1 rounded-sm" onClick={()=>handleNavigate('/')}>Home</li>
            <li className=" hover:bg-gray-400 p-1 rounded-sm" onClick={()=>handleNavigate('/lost')}>Lost</li>
            <li className=" hover:bg-gray-400 p-1 rounded-sm" onClick={()=>handleNavigate('/reportlost')}>Report Lost</li>
            <li className=" hover:bg-gray-400 p-1 rounded-sm" onClick={()=>handleNavigate('/found')}>Found</li>
            <li className=" hover:bg-gray-400 p-1 rounded-sm" onClick={()=>handleNavigate('/reportfound')}>Report Found</li>
            <li className=" hover:bg-gray-400 p-1 rounded-sm" onClick={()=>handleNavigate('/profile')}>Profile</li>
        </ul>
      </div>

      <div className="p-2 items-center bg-blue-400 rounded-md hover:bg-gray-400">
        <button className=" ">Sign Out</button>
      </div>

    </div>
  );
};

export default Nav;
