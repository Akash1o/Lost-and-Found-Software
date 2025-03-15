import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import man from "../images/ippo.png";
import lo from "../images/lo.png";

const Lost = () => {
  const [formData, setFormData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contactDetail, setContactDetail] = useState(null);

  const navigate = useNavigate();

  // Handle the navigation to the report page
  const handleNavigate = (path) => {
    navigate(path);
  };

  // Fetch data from PHP API on component mount
  useEffect(() => {
    setLoading(true);
    const userId = localStorage.getItem("idNumber")
    axios
      .get(`http://localhost/backend/Lost.php?id=${userId}`)
      .then((response) => {
        if (response.data.success) {
          setFormData(response.data.item);
        } else {
          setError(response.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data.");
        setLoading(false);
      });
  }, []); // Empty dependency array ensures it only runs once when the component mounts

  // Handle the search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter the formData based on the search query
  const filteredData = formData.filter(
    (item) =>
      // item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.item.toLowerCase().includes(searchQuery.toLowerCase())
    // item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    // item.date.includes(searchQuery)
  );
  const handleContactData = async (id) => {
    try {
      const response = await axios.get(`http://localhost/backend/contact.php?id=${id}`);

      if (response.status === 200) {
        setContactDetail(response.data);
      } else {
        console.error("Error fetching contact data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // console.log(contactDetail.items[0].fullname)
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
          placeholder="Search for itemsName"
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

      <div className="mt-[55px]  ">
        {loading ? (
          <h3>Loading...</h3>
        ) : error ? (
          <h3>{error}</h3>
        ) : filteredData.length > 0 ? (
          <ul className="grid gap-2 grid-cols-1 four:grid-cols-2 nine:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 w-[90%] mx-auto">
            {filteredData.map((items, index) => (
              <li
                key={index}
                className="border-2 rounded-md border-gray-600 p-4 m-4 mx-auto w-full  bg-blue-100 shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:bg-gradient-to-r from-pink-300 via-yellow-200 to-blue-300"
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
                    <p className=" text-lg"><span className="font-bold">ItemName: </span>{items.item}</p>
                    <p><span className="font-bold">Location: </span>{items.location}</p>
                  </div>

                  <div className="my-4 h-[80px] overflow-y-auto">
                    <h1 className="font-bold">Description</h1>
                    <p>{items.description}</p>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => handleContactData(items.userId)} className="bg-red-600 text-white rounded-2xl p-2 px-4 hover:bg-blue-600">
                      Contact
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="h-[200px] flex justify-center text-4xl text-red-500 items-center ">
            <h3> No items found.</h3>
          </div>
        )}
      </div>
      {
        contactDetail && <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }} className="fixed top-0 w-[100%] h-[100%] z-[1000]">
        <p className="text-white w-[80%] p-[10px]">This is about how to contact this person you can take the given information and contact, so that it will make easy to get your lost materials.</p>
         <div className="h-[100%] w-[100%] flex justify-center items-center">
         
          <div className="flex  gap-5 flex-col border border-purple-500 p-[20px] bg-white rounded-lg">
         
            <h1 >Name: {contactDetail.items[0].fullname}</h1>
            <p >Faculty: {contactDetail.items[0].faculty}</p>
            <p >Email: {contactDetail.items[0].email}</p>
            <p >Phone: {contactDetail.items[0].contact}</p>
          </div>
          <div className="absolute right-4 top-4">
            <button className="bg-red-500 px-3 py-1 text-white rounded-lg" onClick={()=>setContactDetail(null)}>x</button>
          </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Lost;
