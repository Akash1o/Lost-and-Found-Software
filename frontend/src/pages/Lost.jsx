import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import man from "../images/ippo.png";
import lo from "../images/lo.png";

const Lost = () => {
  const [formData, setFormData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Handle the navigation to the report page
  const handleNavigate = (path) => {
    navigate(path);
  };

  // Fetch data from PHP API on component mount
  useEffect(() => {
    axios.get("http://localhost/backend/Lost.php")
      .then(response => {
        if (response.data.success) {
          setFormData(response.data.item);
        } else {
          console.log(response.data.message);
        }
      })
      .catch(error => {
        console.error("Error while fetching data:", error);
      });
  }, []); // Empty dependency array ensures it only runs once when the component mounts

  // Handle the search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter the formData based on the search query
  const filteredData = formData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.date.includes(searchQuery)
  );

  return (
    <div className="bg-gradient-to-br from-pink-100 to-yellow-100 ">
      <h1
        className="flex justify-center text-3xl three:text-6xl"
        style={{
          background: "linear-gradient(to right, #991313 0%, #FF1F1F 75%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          fontWeight: "bold",
        }}
      >
        Lost Items
      </h1>

      <div className="flex flex-col five:flex-row gap-2 justify-center items-center my-4 mb-6">
        <input
          type="text"
          placeholder="Search for items"
          className="border-2 border-blue-400 text-center rounded-full p-3 w-[80%] five:w-[360px] mr-4"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          className="flex items-center px-4 rounded-md text-white"
          onClick={() => handleNavigate("/reportlost")}
          style={{
            background: "linear-gradient(to right, #991313 0%, #FF1F1F 75%)",
          }}
        >
          Report <img src={lo} alt="lo" className="w-12 h-12 ml-2" />
        </button>
      </div>

      <div className="mt-[55px]">
        {filteredData.length > 0 ? (
          <ul className="flex justify-center gap-2 flex-wrap w-[90%] mx-auto">
            {filteredData.map((items, index) => (
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
                    <h3 className="font-semibold text-lg">{items.name}</h3>
                    <p>{items.date}</p>
                  </div>
                </div>

                <div>
                  <img
                    src={`http://localhost/backend/${items.photo_path}`} // Path to the uploaded photo
                    alt={items.title}
                    className="my-4  w-full h-[150px] rounded-lg"
                  />
                  <div>
                    <p className="font-bold text-lg">{items.item}</p>
                    <p>Location: {items.location}</p>
                  </div>

                  <div className="my-4 h-[80px] overflow-y-auto">
                    <p>{items.description}</p>
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-red-600 text-white rounded-2xl p-2 px-4 hover:bg-slate-600">
                      Contact
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <h3 className="h-[200px] flex justify-center text-4xl text-red-500 items-center">
            No items found.
          </h3>
        )}
      </div>
    </div>
  );
};

export default Lost;
