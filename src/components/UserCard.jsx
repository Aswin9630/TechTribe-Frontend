
const UserCard = ({user,showActions}) => {  

    const {firstName,lastName,photoURL,skills=[],age} = user?.user || user;
    const skill = skills.join(" ");
  return (
    <div>
      <div className="card bg-gray-100 w-96 shadow-2xl rounded-xl">
        <figure className="px-5 pt-5">
          <img
            src={photoURL}
            alt="user-image"
            className="rounded-2xl h-64 w-80 object-cover"
          />
        </figure>
        <div className="card-body items-center text-center text-slate-600">
          <h2 className="card-title font-bold">{firstName+" "+lastName},<span className="font-semibold tracking-tight">{age}</span></h2>
          <p className="font-semibold">{skill}</p>
         { showActions && <div className="card-actions">
           <button className="btn glass btn-circle bg-yellow-400 hover:bg-red-600 hover:text-white text-white hover:scale-110 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            <button className="btn glass btn-circle bg-orange-500  hover:bg-green-700 hover:text-white text-white hover:scale-150 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
          </div>}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
