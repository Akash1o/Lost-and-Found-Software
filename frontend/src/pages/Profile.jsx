import React, { useEffect, useState } from "react";
import ippo from "../images/ippo.png";
import axios from "axios";

const Profile = () => {
  const [isEdited, setIsEdited] = useState(false);
  const [allData, setAllData] = useState(true);
  const [detail, setDetail] = useState({
    email: "",
    fullname: "",
    idNumber: "",
    faculty: "",
    contact: "",
  });

  const url = `http://localhost/backend/profiles.php`;

  useEffect(() => {
    const { fullname, idNumber, faculty, contact } = detail;
    setAllData(fullname && faculty && idNumber && contact);
  }, [detail]);

  const handleFetch = async () => {
    const idNumber = localStorage.getItem("idNumber"); // Get idNumber from local storage
  
    if (!idNumber) {
      alert("No ID Number found. Please log in again.");
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost/backend/profiles.php?idNumber=${idNumber}`);
  
      if (response.data && response.data.profile) {
        setDetail(response.data.profile);
      } else {
        console.error("Invalid API response:", response.data);
        setDetail({
          email: "",
          fullname: "",
          idNumber: "",
          faculty: "",
          contact: "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("Failed to fetch profile data.");
      setDetail({
        email: "",
        fullname: "",
        idNumber: "",
        faculty: "",
        contact: "",
      });
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
  };

  const handleSave = async () => {
    const { fullname, faculty, contact, idNumber } = detail;
    if (!fullname || !faculty || !contact) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.put(url, detail);
      if (response.status === 200) {
        alert(response.data.message);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error submitting form");
    }

    handleFetch();
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

      <div className="w-[90%] six:w-[60%] rounded-md p-2 mx-auto border-2 shadow-2xl border-gray-900 mb-4 items-center flex justify-center 
      bg-gradient-to-r from-gray-300 via-blue-300 to-amber-200">
        {isEdited ? (
          <form className="w-[80%] mx-auto flex justify-center flex-col gap-2">
            <div className="flex justify-center">
              <img src={ippo} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
            </div>

            <label className="block font-bold text-amber-700">Name</label>
            <input type="text" name="fullname" value={detail.fullname} onChange={handleChange} className="w-[90%] border-2 p-1 rounded-md outline-none border-blue-400" />

            <label className="block font-bold text-purple-600">Faculty</label>
            <input type="text" name="faculty" value={detail.faculty} onChange={handleChange} className="w-[90%] border-2 p-1 rounded-md outline-none border-blue-400" />

            <label className="block font-bold text-green-600">Contact Number</label>
            <input type="number" name="contact" value={detail.contact} onChange={handleChange} className="w-[90%] border-2 p-1 rounded-md outline-none border-blue-400 block" />

            <div className="flex justify-between gap-2 mb-2">
              <button type="button" onClick={handleSave} className="w-[100px] three:w-[150px] bg-blue-500 text-white p-2 rounded-md mt-2">
                Save
              </button>
              <button type="button" onClick={() => setIsEdited(false)} className="w-[100px] three:w-[150px] bg-red-600 text-white p-2 rounded-md mt-2">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="w-[80%] mx-auto flex justify-center flex-col gap-2 overflow-hidden">
            <div className="flex justify-center">
              <img src={ippo} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
            </div>

            {!allData && <p className="text-red-500 inline-block">Please update your profile</p>}

            <div className="flex items-center gap-1">
              <h2 className="font-bold">Name:</h2>
              <p>{detail.fullname}</p>
            </div>

            <div className="flex items-center gap-1">
              <h2 className="font-bold">ID Number:</h2>
              <p>{detail.idNumber}</p>
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
<div className="flex justify-end">
<button type="button" onClick={() => setIsEdited(true)} className=" w-[100px] three:w-[150px] hover:bg-blue-400 bg-blue-600 text-white p-2 rounded-md mt-2">
              Edit Profile
            </button>
</div>
           
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
