import React from "react";
import { useState } from "react";
import { useFormData } from "../context/FormdataContext";

const ReportLost = () => {
 const{formData, updateFormData}=useFormData();


 const [newFormData,setNewFormData]=useState({
  name: '',
  item: '',
  location: '',
  date: '',
  description: '',
  photo:null,
 })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewFormData({ ...newFormData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFormData({ ...newFormData, photo: file });
    }
  };

  const handleSubmit = (event) => {
    // Handle form submission here (e.g., send data to server)
    event.preventDefault();
    const { name, item, location, date, description, photo } = newFormData;
    if (!name || !item || !location || !date || !description || !photo){
alert("Please fill all the fields");
    }
    else{
      updateFormData(newFormData)
      // console.log(newFormData);
      // console.log(formData);
      alert("Form submitted successfully");
      setNewFormData({
        name: '',
        item: '',
        location: '',
        date: '',
        description: '',
        photo: null,
      });
    }
   
  };
  return (
    <div className='bg-gradient-to-br from-pink-100 to-yellow-100'>
      <h1
        className="flex justify-center"
        style={{
          background: "linear-gradient(to right, #FF0000, #0000FF, #00FF00)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          fontSize: "60px",
          fontWeight: "bold",
        }}
      >
        Report Lost Items
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-300 p-6 rounded-lg shadow-md sm:w-[60%] w-full  m-0 mx-auto mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block  w-full rounded-md border-gray-300 shadow-sm outline-none p-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="item"
            className="block text-sm  font-medium text-gray-700"
          >
            Item:
          </label>
          <select
            id="item"
            name="item"
            value={formData.item}
            onChange={handleChange}
            className="mt-1 block w-full outline-none p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Item</option>
            <option value="Phone">Phone</option>
            <option value="Wallet">Wallet</option>
            <option value="Wallet">Calculator</option>
            <option value="Wallet">Book</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location:
          </label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none p-2 focus:border-indigo-500 focus:ring-indigo-500 "
          >
            <option value="">Select Location</option>
            <option value="Canteen">Canteen</option>
            <option value="washroom">Washroom</option>
            <option value="Classroom">Classroom</option>
            <option value="Library">Library</option>
            <option value="Hall">Hall</option>
            {/* Add more location options */}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 outline-none p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Item Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-24"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="photo"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Photo:
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handlePhotoChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            type="reset"
            className="bg-gray-300 hover:bg-red-400 text-gray-700 font-bold py-2 px-4 rounded ml-4"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};
export default ReportLost;

// try{
//   const dataToSave={...formData};
//   const jsonData=JSON.stringify(dataToSave);

//   const response=await fetch('/save-data.json',{
//     method:'post',
//     headers:{
//       'Content-Type': 'application/json',
//     },
//     body:jsonData,
//   });
//   if(!response.ok){
//     throw new Error('Failed to save data.');
//   }
//   console.log('Data saved successfully!');
//       }
//       catch(error){
//         console.error('Error saving data:', error);
//       }
