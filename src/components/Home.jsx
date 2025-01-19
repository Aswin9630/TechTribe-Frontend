import { useSelector } from "react-redux";
import useFeedUser from "../hooks/useFeedUser";
import useFetchUser from "../hooks/useFetchUser"
import UserCard from "./UserCard";


const Home = () => {
  useFetchUser();
  useFeedUser();
  const feed = useSelector(store=>store.feed);


  return (
   feed && ( 
   <div className="m-5 flex justify-center">
      <UserCard user={feed[0]} showActions={true}/>
    </div>
    )
  )
}

export default Home