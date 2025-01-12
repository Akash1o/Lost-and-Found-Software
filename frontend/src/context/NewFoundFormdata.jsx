import React, { createContext, useContext, useState } from 'react'
const foundContext=createContext();

export const NewFoundFormdata = ({children}) => {
    const [foundFormDataArray,setFoundFormDataArray]=useState([])

    const updatedFoundFormData=(newFoundData)=>{
        setFoundFormDataArray((preData)=>[...preData,newFoundData])
    }
  return (
    <div>
      <foundContext.Provider value={{foundFormDataArray,updatedFoundFormData}} >
{children}
      </foundContext.Provider>
    </div>
  )
}

export const useFoundFormData=()=>{
    return useContext(foundContext);
}

export default NewFoundFormdata
