import axios from "axios";
import ShimmerUI from "./ShimmerUI";
import { useDispatch } from "react-redux";
import { removeFeedUser } from "../redux/slice/feedSlice";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../utils/constants";
import images from "../assets/home_img.png"

const UserCard = ({ user, showActions, image }) => {
  const dispatch = useDispatch();
  if (!user) return <ShimmerUI />;

  const { _id, firstName, lastName, photoURL, designation } =
    user || user?.user;

  const handleconnectionRequest = async (status, userId) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeFeedUser(userId));
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row lg:flex-row gap-5">
    { image &&  <div className="w-1/2 mx-auto lg:mx-7">
        <div>
          <h2 className="font-semibold text-2xl lg:text-4xl text-center text-amber-600">Let them connect with you effortlessly 
            <span className="uppercase font-bold text-yellow-500">—just one click away.
          </span></h2>
        </div>
        <img src={images} alt="" className="lg:w-7/12 mx-auto"/>
      </div>
      }
      <div className="card border border-gray-800 shadow-2xl rounded-xl">
        <figure className="px-3 pt-5">
          <img
            src={photoURL}
            alt="user-image"
            className="rounded-2xl lg:h-52 lg:w-72 h-48 w-60 object-cover"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title font-bold text-2xl lg:text-3xl">{firstName + " " + lastName}</h2>
          <p className="font-semibold">{designation}</p>
          {showActions && (
            <div className="card-actions">
              <button
                onClick={() => handleconnectionRequest("ignored", _id)}
                className="btn glass tooltip btn-circle  bg-yellow-400 hover:bg-orange-600 hover:text-white text-white hover:scale-110 transition-all duration-300"
                 data-tip="ignore"
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                 
                  className="h-6 w-6 tooltip"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleconnectionRequest("interested", _id)}
                className="btn glass tooltip btn-circle  bg-orange-500  hover:bg-green-400 hover:text-white text-white hover:scale-110 transition-all duration-300"
                data-tip="interested"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
      
                  className="h-6 w-6 tooltip"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
