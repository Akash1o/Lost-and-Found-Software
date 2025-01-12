
import { useFormData } from "../context/FormdataContext";
import man from "../images/ippo.png";
import lo from "../images/lo.png";
import { useNavigate } from "react-router-dom";

const Lost = () => {
  const { formData } = useFormData();

  const navigate=useNavigate()

  const handleNavigate=(path)=>{

    navigate(path)
  }

  return (
    <div className=" bg-gradient-to-br from-pink-100 to-yellow-100">
      <h1
        className="flex justify-center"
        style={{
         background: "linear-gradient(to right, #991313 0%, #FF1F1F 75%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          fontSize: "60px",
          fontWeight: "bold",
        }}
      >
        Lost Items
      </h1>

      <div className="flex justify-center items-center my-4">
        <input
          type="text"
          placeholder="Items Name"
          className="border-2 border-blue-400 rounded-full p-2 w-[350px] mr-4"
        />
        <button
          className="flex items-center px-4 rounded-md text-white"
          onClick={()=>handleNavigate("/reportlost")}
          style={{
            background: "linear-gradient(to right, #991313 0%, #FF1F1F 75%)",
          }}
        >
          Report <img src={lo} alt="lo" className="w-12 h-12 ml-2" />
        </button>
      </div>

      <div>
        {formData && formData.length > 0? <ul className="flex justify-center gap-2 flex-wrap">
        {formData.map((items, index) => (
          <li
            key={index}
            className="border-2 rounded-md border-gray-600 p-4 m-4 mx-auto w-full sm:w-1/2  md:w-1/4 lg:w-1/5 xl:w-1/5 "
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
                  src={URL.createObjectURL(items.photo)}
                  alt={items.title}
                  className="my-4  object-cover w-full h-[150px]"
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
      </ul>:<h3 className="h-[200px] flex justify-center text-4xl text-red-500 items-center">There is no items to show.</h3>}
      </div>

      
    </div>
  );
};

export default Lost;
