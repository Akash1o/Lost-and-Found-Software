
import { useEffect, useState } from 'react';
import man from "../images/ippo.png";
import lo from "../images/search.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Found = () => {
  const[foundDataList,setFoundDataList]=useState([]);

  
  const navigate=useNavigate()

  const handleNavigate=(path)=>{
    navigate(path)
    
  }

  useEffect(()=>{
    axios.get("http://localhost/backend/found.php")
    .then(response=>{
      if(response.data.success){

        setFoundDataList(response.data.items)
      }
      else{
        console.log("no data found");
      }
    })
    .catch(error=>{
      console.log(error);
    },[])
  });



  

  return (
    <div className=' bg-gradient-to-br from-pink-100 to-yellow-100'>
          <h1
            className="flex justify-center text-3xl five:text-6xl"
            style={{
              background:'linear-gradient(to right,#00CB14 0%, #00650A 75%)',
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              fontWeight: "bold",
            }}
          >
            found Items
          </h1>
    
          <div className="flex flex-col five:flex-row gap-3 justify-center items-center my-4">
            <input
              type="text"
              placeholder="Items Name"
              className="border-2 border-blue-400 text-center rounded-full p-2  w-[70%] five:w-[350px] mr-4"
            />
            <button
              className="flex items-center px-4 rounded-md text-white"
              onClick={()=>handleNavigate('/reportfound')}
              style={{
                background:'linear-gradient(to right,#00CB14 0%, #00650A 75%)',
              }}
            >
              Report <img src={lo} alt="lo" className="w-12 h-12 ml-2" />
            </button>
          </div>
    
          <div>
            {foundDataList && foundDataList.length > 0? <ul className="flex justify-center gap-2 flex-wrap w-[90%] mx-auto">
            {foundDataList.map((items, index) => (
              <li
                key={index}
                className="border-2 rounded-md border-gray-600 p-4 m-4 mx-auto w-full five:w-1/3 seven:w-1/4 lg:w-1/5 bg-blue-100 shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:bg-gradient-to-r from-pink-300 via-yellow-200 to-blue-300"
              >
                <div className="flex gap-2 items-center">
                  <img
                    src={man}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h3>{items.name}</h3>
                    <p>{items.date}</p>
                  </div>
                </div>
    
                <div>
                  {
                    <img
                    src={`http://localhost/backend/${items.photoPath}`}
                      alt={items.title}
                      className="my-4   w-full h-[150px]"
                    />
                  }
                  <div>
                    <p className="font-bold">{items.item}</p>
                    <p>Location:{items.location}</p>
                  </div>
    
                  <div className="my-4 h-[80px] overflow-y-auto">
                    <p>{items.description}</p>
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-purple-600  text-white rounded-2xl p-2 px-4">
                      Contact
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>:<h3 className="h-[200px] flex justify-center text-4xl text-green-500 items-center">There is no items to show.</h3>}
          </div>
    
          
        </div>
  )
}

export default Found
