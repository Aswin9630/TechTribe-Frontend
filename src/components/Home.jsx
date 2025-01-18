import { useSelector } from "react-redux";
import useFeedUser from "../hooks/useFeedUser";
import useFetchUser from "../hooks/useFetchUser"
import UserCard from "./UserCard";


const Home = () => {
  const feed = useSelector(store=>store.feed);
  console.log("feed",feed)

 useFetchUser();
 useFeedUser();


  return (
   feed && ( 
   <div className="m-5 flex justify-center">
      <UserCard user={feed[0]} />
    </div>
    )
  )
}

export default Home