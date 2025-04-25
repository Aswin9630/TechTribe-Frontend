import { useSelector } from "react-redux";
import useFeedUser from "../hooks/useFeedUser";
import useFetchUser from "../hooks/useFetchUser";
import UserCard from "./UserCard";
import ShimmerUI from "./ShimmerUI";
import { useEffect, useState } from "react";

const Home = () => {
  const [loading,setLoading] = useState(true);
  useFetchUser();
  useFeedUser();
  const feeds = useSelector((store) => store.feed);
  const feed = feeds?.feed;

  useEffect(()=>{
    if(feed){
      setLoading(false)
    }
  },[feed])

  if (loading) return <ShimmerUI />;
  if (feed.length === 0) {
    return <h1 className="text-xl lg:text-3xl font-semibold lg:font-bold my-10 text-center">You reached the daily swipe limit,
     <span className="uppercase text-yellow-700"> Update to Premium </span> 
     for unlimited Swipes and Chat</h1>;
      
  }

  return (
    feed && (
      <div className="m-5 flex justify-center p-3 rounded-lg ">
        <UserCard user={feed[0]} showActions={true} image={true}/>
      </div>
    )
  );
};

export default Home;
