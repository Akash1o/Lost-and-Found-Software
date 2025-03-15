import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardLost = ({lostData,setLostData,updateLostCount}) => {
  const [photoPopup, setPhotoPopup] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhoto = (photoPath) => {
    setSelectedPhoto(photoPath);
    setPhotoPopup(true);
  };

  const closePhotoPopup = () => {
    setPhotoPopup(false);
    setSelectedPhoto(null);
  };

  const handleDelete=async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;
      try {
        const response = await axios.post(
          "http://localhost/backend/deleteLost.php",
          { id: id }
        );
      if(response.data.success){
        setLostData((prevData) => prevData.filter(item => item.lost_id !== id));
        updateLostCount(lostData.length-1)
      }
      else{
        console.log("failed to delete data");
      }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    
    
  };

  useEffect(() => {
    axios.get('http://localhost/backend/FetcheData.php')
      .then((response) => {
        if (response.data.success && response.data.lostItem) {
          setLostData(response.data.lostItem);
          updateLostCount(response.data.lostItem.length);
        } else {
          console.error("Unexpected response structure", response.data);
        }
      })
      .catch((error) => console.error('Error fetching lost items:', error));
  }, []);

  return (
    <div>
      <h1 className='font-bold text-2xl'>All Lost Items</h1>
      <div className="mt-[10px] overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2 text-left">Person</th>
              <th className="px-4 py-2 text-left">Items</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {lostData && lostData.map((item) => (
              <tr className="border-b hover:bg-gray-100" key={item.lost_id}>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.item}</td>
                <td className="px-4 py-2">{item.location}</td>
                <td className="px-4 py-2">
                  <button className='bg-red-600 hover:bg-red-400 text-white px-2 py-1 rounded-md' onClick={()=>handleDelete(item.lost_id)}>Delete</button>
                  <button 
                    className='bg-green-600 hover:bg-green-400 text-white px-2 py-1 rounded-md ml-[10px]' 
                    onClick={() => handlePhoto(item.photo_path)}>View Photo
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  
      {photoPopup && selectedPhoto && (
        <div className='fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center bg-black bg-opacity-70 z-50' onClick={closePhotoPopup}>
          <div className='relative bg-white p-4 rounded-lg'>
            <button className='absolute top-2 right-2 text-xl font-bold text-red-500' onClick={closePhotoPopup}>✖</button>
            <img src={`http://localhost/backend/${selectedPhoto}`} className='max-w-[400px] h-auto' alt="Lost Item" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLost;
