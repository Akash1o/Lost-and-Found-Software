import React, { useEffect, useState } from "react";
import ippo from "../images/ippo.png";
import axios from "axios";
import man from "../images/ippo.png";

const Profile = ({ isLoggedIn }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [allData, setAllData] = useState(true);
  const [foundDataList, setFoundDataList] = useState([]);

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

  useEffect(() => {
    const userId=localStorage.getItem('idNumber');
    axios.get(`http://localhost/backend/found.php?userId=${userId}`)
      .then(response => {
        if (response.data.success) {

          setFoundDataList(response.data.items)
        }
        else {
          console.log("no data found");
        }
      })
      .catch(error => {
        console.log(error);
      })
      // console.log(userId);
  }, []);
 
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
    const { fullname, faculty, contact} = detail;
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
      alert("Error submitting your profile..");
    }

    handleFetch();
    setIsEdited(false);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleItemClick = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost/backend/deleteFound.php",
        { id: id }
      );
    if(response.data.success){
      setFoundDataList((prevData) => prevData.filter(item => item.found_id !== id));
    }
    else{
      console.log("failed to delete data");
    }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
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

      <div className="w-[90%] mx-auto ">
        {foundDataList && foundDataList.length > 0 ? <ul className="flex flex-wrap flex-shrink justify-center  ">
          {foundDataList.map((items, index) => (
            <li
              key={index}
              onClick={()=>handleItemClick(items.found_id)}
              className="border-2 rounded-md border-gray-600 py-[10px] px-[30px] m-4 mx-auto  bg-blue-100 shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
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
                  <p className="inline font-bold">ItemName:</p>
                  <p className=" inline">{items.item}</p>
                  <p><span className="font-bold">Location:</span>{items.location}</p>
                </div>

                <div className="my-4 h-[80px] overflow-y-auto">
                  <h1 className="font-bold">Description</h1>
                  <p className="max-w-[150px]">{items.description}</p>
                </div>
              </div>
              <div className="flex justify-end">
               <button className="text-white px-3 py-2 bg-red-600 hover:bg-red-400 rounded-full">Delete Item</button>
              </div>
            </li>
          ))}
        </ul> : <h3 className="h-[200px] flex justify-center text-4xl text-green-500 items-center">There is no foundItems to show.</h3>}
      </div>
    </div>
  );
};

export default Profile;
