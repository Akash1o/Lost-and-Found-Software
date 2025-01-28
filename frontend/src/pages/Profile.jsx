import React, { useEffect, useState } from 'react';
import ippo from '../images/ippo.png';
import axios from 'axios';

const Profile = () => {
  const [isEdited, setIsEdited] = useState(false);
  const [allData, setAllData] = useState(true);
  const [detail, setDetail] = useState({
    name: '',
    id: '',
    faculty: '',
    contact: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost/backend/profileData.php')
      .then((response) => {
        if (response.data.success) {
          setDetail(response.data.profile);
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error while fetching profile data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
  };

  const handleSave = async () => {
    const { name, id, faculty, contact } = detail;

    if (!name || !faculty || !id || !contact) {
      alert('Please fill in all the fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('id', id);
    formData.append('faculty', faculty);
    formData.append('contact', contact);

    try {
      const response = await axios.post(
        'http://localhost/backend/profile.php',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data.success) {
        alert('Profile updated successfully!');
        setIsEdited(false); // Exit edit mode
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error occurred while saving profile:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleEdit = () => {
    setIsEdited(true);
  };

  const handleCancel = () => {
    setIsEdited(false);
  };

  return (
    <div>
      <h1 className="flex justify-center font-bold text-3xl p-2 text-blue-500">Profile</h1>
      <div className="w-[90%] six:w-[60%] rounded-md p-2 mx-auto border-2 shadow-2xl border-gray-900 mb-4 items-center flex justify-center 
      bg-gradient-to-r from-gray-300 via-blue-300 to-amber-200">
        {isEdited ? (
          <form className="w-[80%] mx-auto flex justify-center flex-col gap-2">
            <div className="flex justify-center">
              <img src={ippo} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
            </div>
            <label htmlFor="name" className="block font-bold text-amber-700">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={detail.name || ''}
              onChange={handleChange}
              className="w-[90%] border-2 p-1 rounded-md outline-none border-blue-400"
            />

            <label htmlFor="id" className="block font-bold text-gray-500">ID Number</label>
            <input
              id="id"
              type="number"
              name="id"
              value={detail.id || ''}
              onChange={handleChange}
              className="w-[90%] border-2 p-1 rounded-md outline-none border-blue-400"
            />

            <label htmlFor="faculty" className="block font-bold text-purple-600">Faculty</label>
            <input
              type="text"
              id="faculty"
              name="faculty"
              value={detail.faculty || ''}
              onChange={handleChange}
              className="w-[90%] border-2 p-1 rounded-md outline-none border-blue-400"
            />

            <label htmlFor="contact" className="block font-bold text-green-600">Contact Number</label>
            <input
              id="contact"
              type="number"
              name="contact"
              value={detail.contact || ''}
              onChange={handleChange}
              className="w-[90%] border-2 p-1 rounded-md outline-none border-blue-400"
            />

            <div className="flex justify-between gap-2 mb-2">
              <button
                type="button"
                onClick={handleSave}
                className="w-[100px] bg-blue-500 text-white p-2 rounded-md"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="w-[100px] bg-red-500 text-white p-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="w-[80%] mx-auto flex justify-center flex-col gap-2">
            <div className="flex justify-center">
              <img src={ippo} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
            </div>
            <div className="flex items-center gap-1">
              <h2 className="font-bold">Name:</h2>
              <p>{detail.name || 'N/A'}</p>
            </div>
            <div className="flex items-center gap-1">
              <h2 className="font-bold">ID Number:</h2>
              <p>{detail.id || 'N/A'}</p>
            </div>
            <div className="flex items-center gap-1">
              <h2 className="font-bold">Faculty:</h2>
              <p>{detail.faculty || 'N/A'}</p>
            </div>
            <div className="flex items-center gap-1">
              <h2 className="font-bold">Contact:</h2>
              <p>{detail.contact || 'N/A'}</p>
            </div>
            <button
              type="button"
              onClick={handleEdit}
              className="w-[100px] bg-blue-600 text-white p-2 rounded-md"
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
