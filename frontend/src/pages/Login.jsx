import React, { use, useState } from 'react';
import log from '../images/log.png';
import axios from 'axios';

function Login() {
  const[input,setInput] =useState ({

    email:'',
    password:'',
  })
  const handleForm =async(e)=>{
     e.preventDefault();
//      const{fullname,email,password} =input;
    
//      try{
//       const LoginData = new FormData();
//       LoginData.append("fullname",fullname);
//       LoginData.append("email",email);
//       LoginData.append("password",password);
 
//         const response = await axios.post("http://localhost/backend/Create.php", LoginData,{
//            headers:{
//              "Content-Type": "multipart/form-data",
//                  }
//            });
//            if(response.status===200){
//              alert(response.data.message);
//              setInput({
//                fullname:"",
//                email:"",
//                password:"", 
//              });
 
//             }
//             console.log(response);
 
//    }    catch(error){
//      console.error("erro in submitting :", error);
//      alert("Failed to submit the form. Please try again!!")
//    }
        
      } 
   
    
          

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setInput({...input,[name]:value})
  }


  




  return (
    <div className="bg-gradient-to-br from-pink-100 to-yellow-100 h-[600px] flex justify-center items-center">
      <div className="flex border-2 border-gray-800 bg-gray-600 w-[1000px] h-[490px]">
    
        <div className="flex-col p-8 w-1/2">
          <p className="ml-11 text-2xl font-bold text-red-600 mt-6">Get started</p>
          <span className="font-bold ml-11 text-yellow-300">Search Your Objects</span>
          <p className="font-bold text-gray-500 ml-11 mb-6">On a one click Sing In away.</p>
          <img src={log} className="object-contain w-[400px] h-[373px] ml-7" />
        </div>

   
        <div className="flex-col p-8 w-1/2 bg-white border-2 border-black rounded-3xl">
          <p className="font-bold text-lg text-center">Create Account</p>
       
          <form onSubmit={handleForm}
          className="flex flex-col mt-4">
          
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
              name='password'
              value={input.password}
              onChange={handleChange}
              placeholder="Password" 
              className="mb-4 p-2 border-2 border-gray-300 rounded-md"
            />

          <button   className='bg-red-600 text-white p-2 rounded-sm mt-3'>Login  </button>
          </form>


        </div>
      </div>
    </div>
  );
}

export default Login;