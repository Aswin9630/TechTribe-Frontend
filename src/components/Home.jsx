import { useSelector } from "react-redux";
import useFeedUser from "../hooks/useFeedUser";
import useFetchUser from "../hooks/useFetchUser";
import UserCard from "./UserCard";
import ShimmerUI from "./ShimmerUI";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    return <h1 className="text-3xl font-bold text-gray-700 my-10 text-center">No new User,check <Link to="/connections"><span className="text-blue-400">connections</span></Link></h1>;
  }

  return (
    feed && (
      <div className="m-5 flex justify-center p-3 rounded-lg">
        <UserCard user={feed[0]} showActions={true} />
      </div>
    )
  );
};

export default Home;
