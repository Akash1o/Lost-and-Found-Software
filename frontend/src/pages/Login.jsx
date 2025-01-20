import React, { useState } from 'react';
import log from '../images/log.png';
import axios from 'axios';

function Login() {
  const[input,setInput] =useState ({
   
    email:'',
    password:'',
  })
  const handleForm =(e)=>{
     e.preventDefault();
    // const {fullname,email,password} = input;

}

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setInput({...input,[name]:value})
  }
 const submit =()=>{
   const{fullname,email,password} =input;
  if(fullname || email || password){
    alert("Form Submitted");
  }
  else{
    alert("Fill up all the fields.")
  }
 }
  



  return (
    <div className="bg-gradient-to-br from-pink-100 to-yellow-100 h-screen flex justify-center items-center">
      <div className="flex border-2 border-gray-800 bg-gray-600 w-[90%] max-w-[1000px] h-[490px] rounded-xl shadow-lg">
        {/* Left Section */}
        <div className='hidden five:block'>
        <div className="flex-col p-8 w-full md:w-1/2">
          <p className="ml-11 text-2xl font-bold text-red-600 mt-6">Get started</p>
          <span className="font-bold ml-11 text-yellow-300">Search Your Objects</span>
          <p className="font-bold text-gray-500 ml-11 mb-6">On a one-click Sign-In away.</p>
          <img
            src={log}
            alt="login illustration"
            className="object-contain w-full h-[373px] md:w-[400px] md:h-[373px] mx-auto"
          />
        </div>
        </div>

        {/* Right Section (Form) */}
        <div className="flex-col p-8 w-full md:w-1/2 bg-white border-2 border-black rounded-3xl">
          <p className="font-bold text-lg text-center">Create Account</p>
       
          <form onSubmit={handleForm}
          className="flex flex-col mt-4">
            <input 
              type="text" 
              name='fullname'
              value={input.fullname}
              onChange={handleChange}
              placeholder="FullName" 
              className="mb-4 p-2 border-2 border-gray-300 rounded-md"
            />
            <input 
              type="email" 
              name='email'
              value={input.email}
              placeholder="Email"
              onChange={handleChange}
              className="mb-4 p-2 border-2 border-gray-300 rounded-md"
            />
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Password"
              className="mb-4 p-2 border-2 border-gray-300 rounded-md"
            />
            <button onClick={submit} className="bg-blue-600 text-white p-2 rounded-md">login</button>
          </form>


        </div>
      </div>
    </div>
  );
}

export default Login;
