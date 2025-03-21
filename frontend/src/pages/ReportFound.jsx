import React, { useState } from 'react'

import axios from 'axios'

const ReportFound = () => {




  const [foundFormData, setFoundFormData] = useState({
    name: '',
    item: '',
    location: '',
    date: '',
    description: '',
    photo: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoundFormData({ ...foundFormData, [name]: value })
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoundFormData({ ...foundFormData, photo: file })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId=localStorage.getItem('idNumber')
    const { name, item, location, date, description, photo } = foundFormData;
    if (!name || !item || !location || !date || !description || !photo) {
      alert("Please fill all the fields");
    }
    else {
      // console.log(foundFormData);
      // console.log(foundFormDataArray);

      const foundFormData = new FormData();
      foundFormData.append("name", name);
      foundFormData.append("item", item);
      foundFormData.append("location", location);
      foundFormData.append("date", date);
      foundFormData.append("description", description);
      foundFormData.append("photo", photo);

     await axios.post(`http://localhost/backend/reportFound.php?userId=${userId}`, foundFormData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(response => {
          console.log("upload sucessfully", response.data)

          alert(response.data.message);
        })

        .catch(error => {
          console.log("error while uploading", error)
        });

      // updatedFoundFormData(foundFormData);


      setFoundFormData({
        name: '',
        item: '',
        location: '',
        date: '',
        description: '',
        photo: null,
      })
    }
  }

  return (
    <div className='bg-gradient-to-br from-pink-100 to-yellow-100'>

      <h1
        className="flex justify-center text-3xl six:text-6xl"
        style={{
          background: "linear-gradient(to right, #FF0000, #0000FF, #00FF00)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          fontWeight: "bold",
        }}
      >
        Report Found Items
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-300 p-6 rounded-lg shadow-md sm:w-[60%] w-[90%]  m-0 mx-auto mb-4"
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
            placeholder='Enter your name'
            value={foundFormData.name}
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
            value={foundFormData.item}
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
            value={foundFormData.location}
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
            value={foundFormData.date}
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
            value={foundFormData.description}
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
  )
}

export default ReportFound
