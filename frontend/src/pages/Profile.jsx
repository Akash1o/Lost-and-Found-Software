import React, { use, useEffect, useState } from "react";
import ippo from "../images/ippo.png";
import axios from "axios";

const Profile = ({ isLoggedIn }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [allData, setAllData] = useState(true);
  const [detail, setDetail] = useState({
    email:"",
    name: "",
    id: "",
    faculty: "",
    contact: "",
  });
 
const url=`http://localhost/backend/profiles.php`;

  useEffect(() => {
    const { name, id, faculty, contact } = detail;
    if (!name || !faculty || !id || !contact) {
setAllData(false);
    } else {
    setAllData(true);
  }
    console.log("detail", detail);
  }, [detail]);

const handleFetch=async()=>{
  try {
    const response = await axios.get(url);
    if (response.data && response.data.profile) {
 setDetail(response.data.profile);
    } else {
      console.error("Invalid API response:", response.data);
      setDetail({
        email: "",
        name: "",
        id: "",
        faculty: "",
        contact: "",
      });
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    alert("Failed to fetch profile data.");
    setDetail({
      email: "",
      name: "",
      id: "",
      faculty: "",
      contact: "",
  });
  }

}
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEdit = () => {
    setIsEdited(true);
  };

  const handleSave = async() => {
    const { name, id, faculty, contact } = detail;
    if (!name || !faculty || !id || !contact) {
      alert("Please fill the form");
    } else {
      // const detail = new FormData();
      // detail.append("name", name);
      // detail.append("id", id);
      // detail.append("faculty", faculty);
      // detail.append("contact", contact);
      try {
        if(detail.id){
          const response= await axios.put(url,detail);
          if(response.status===2000){
            alert(response.data.message);
        }
     }
        else{
          const responses=await axios.post(url,detail);
          if(responses.status===2000){
           alert(responses.data.message);
        }
    }
       
        
      } catch (error) {
        console.log("Error occurred:", error);
        alert("Error submitting form");
      }
    }
    setIsEdited(false);
  };

  const handleCancel = () => {
    setIsEdited(false);
  };
  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div>
      <h1 className="flex justify-center font-bold text-3xl p-2 text-blue-500">
        Profile
      </h1>

      <div
        className="w-[90%] six:w-[60%] rounded-md p-2 mx-auto border-2 shadow-2xl border-gray-900 mb-4 items-center flex justify-center 
      bg-gradient-to-r from-gray-300 via-blue-300 to-amber-200"
      >
        {isEdited ? (
          <form
            onSubmit={handleSubmit}
            className="w-[80%] mx-auto flex justify-center flex-col gap-2 "
          >
          <div className="flex justify-center">
              <img
                src={ippo}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
          </div>
            <label htmlFor="name" className="block font-bold text-amber-700">
              Name
            </label>
          <input
              id="name"
            type="text"
            name="name"
            value={detail.name || ""}
            onChange={handleChange}
            className="w-[90%] border-2 p-1 rounded-md outline-none border-blue-400"
          />

            <label htmlFor="id" className="block font-bold text-gray-500">
              ID Number
            </label>
          <input
              id="id"
            type="number"
            name="id"
            value={detail.id || ""}
            onChange={handleChange}
            className="w-[90%] border-2 p-1 rounded-md outline-none border-blue-400"
          />

            <label
              htmlFor="faculty"
              className="block font-bold text-purple-600"
            >
              Faculty
            </label>
          <input
            type="text"
              id="faculty"
            name="faculty"
            value={detail.faculty || ""}
            onChange={handleChange}
            className="w-[90%] border-2 p-1 rounded-md outline-none border-blue-400"
          />

            <label htmlFor="contact" className="block font-bold text-green-600">
              Contact Number
            </label>
          <input
              id="contact"
            type="number"
            name="contact"
            value={detail.contact || ""}
            onChange={handleChange}
            className="w-[90%] border-2 p-1 rounded-md outline-none border-blue-400 block"
          />

          {isEdited ? (
            <div className="flex justify-between gap-2 mb-2">
    <button
  type="submit"
  onClick={handleSave}
  className="relative w-[100px] three:w-[150px] ml-none five:ml-auto five:mr-[32px] bg-blue-500 text-white p-2 rounded-md mt-2 overflow-hidden group"
>
  Save
  <span className="absolute top-0 left-0 w-full h-[2px] bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></span>
  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
</button>

<button
  type="reset"
  onClick={handleCancel}
  className="relative w-[100px] three:w-[150px] mr-auto five:ml-auto bg-red-600 text-white p-2 rounded-md mt-2 overflow-hidden group"
>
  Cancel
  <span className="absolute top-0 left-0 w-full h-[3px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></span>
  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
</button>
            </div>
            ) : (
            <button
              type="button"
              onClick={handleEdit}
              className=" w-[100px] three:w-[150px] ml-none five:ml-auto hover:bg-blue-400 bg-blue-600 text-white p-2 rounded-md mt-2"
            >
              Edit Profile
            </button>
            )}
          </form>
        ) : (
          <div className="w-[80%] mx-auto flex justify-center flex-col gap-2 ">
          <div className="flex justify-center">
              <img
                src={ippo}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            {allData ? null : (
              <p className="text-red-500 inline-block">
                Please update your profile
              </p>
            )}
              
            <div className="flex items-center gap-1">
              <h2 className="font-bold">Name:</h2>
              <p>{detail.name}</p>
            </div>

            <div className="flex items-center gap-1">
              <h2 className="font-bold">ID Number:</h2>
              <p>{detail.id}</p>
            </div>

            <div className="flex items-center gap-1">
              <h2 className="font-bold">Faculty:</h2>
              <p>{detail.faculty}</p>
            </div>

            <div className="flex items-center gap-1">
              <h2 className="font-bold">Contact:</h2>
              <p>{detail.contact}</p>
            </div>

            <div className="flex items-center gap-1">
              <h2 className="font-bold">Email:</h2>
              <p>{detail.email}</p>
            </div>

            <button
              type="button"
              onClick={handleEdit}
              className=" w-[100px] three:w-[150px] ml-none five:ml-auto hover:bg-blue-400 bg-blue-600 text-white p-2 rounded-md mt-2"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;