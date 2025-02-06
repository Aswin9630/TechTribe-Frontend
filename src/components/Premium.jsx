import React, { useEffect, useState } from "react";
import axios from "axios";
import ShimmerUI from "./ShimmerUI";
import { Link } from "react-router-dom";
import Ribbon from "../assets/gold-ribbon-banner.webp"
import GOld_Membership_Badge from "../assets/gold_membership.png"
import Silver_Membership_Badge from "../assets/Silver_Membership.webp"
import Bronze_Membership_Badge from "../assets/Bronze_membership.png"
import { BACKEND_URL, CURRENCY } from "../utils/constants";

const Premium = () => {
  const [isPremiumUser, setIsPremiumUser ] = useState(false)
  const [loading, setLoading ] = useState(true);

  useEffect(()=>{
    verifyPremiumUser();
  },[])
 
  const verifyPremiumUser = async()=>{
    try {
      const response = await axios.get(`${BACKEND_URL}/payment/premium/verify`,{withCredentials:true});
      const data = response.data.isPremium
      
      if(data === false){
        setIsPremiumUser(false)
      }else{
        setIsPremiumUser(true)
      }
    } catch (error) {
      console.error(error)
    } finally{
      setLoading(false)
    }
  }

  if(loading){
    return <ShimmerUI/>
  }

  const handleSubmit = async (type)=>{
    try {
      const order = await axios.post(`${BACKEND_URL}/payment/createOrder`, {membershipType:type} , {withCredentials:true})
      
      const {amount,currency,orderId,notes} = order.data?.paymentDetails;
      const options = {
        key: order.data?.keyId, 
        amount: amount/100, 
        currency: currency,
        name:NAME_OF_APPLICATION,
        description: 'PAYMENT TRANSACTIONS',
        order_id: orderId, 
        prefill: {
          name: notes.firstName+" "+notes.lastName,
          email:notes.email,
          membershipType:notes.membershipType,
          contact:"9999888777"
        },
        theme: {
          color: '#007BFF'
        },
        handler:verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <>

   { isPremiumUser ? ( 
     <div>
       <h2 className="text-xl lg:text-3xl my-5 font-bold text-yellow-500 mx-5 lg:text-center font-serif">ALREADY A PREMIUM USER</h2>
       <Link to="/connections"><button className="text-xl lg:text-3xl my-5 font-bold text-yellow-500 mx-5 border border-yellow-500 rounded-lg p-2 font-serif">Click here to chat</button></Link>
    </div>
    ):(
      <div className="flex flex-col">
      <div className="text-center font-serif">
        <div className="flex flex-col">
            <h1 className="text-3xl lg:text-5xl my-5 font-bold text-yellow-500 underline">Premium Plans</h1>
            <h2 className="text-xl lg:text-2xl">Unlock Exclusive Features & Elevate Your Experience!</h2>
            <img src={Ribbon} alt="" className="w-56 mx-auto"/>
        </div>         
      </div>
      <div className="flex flex-col lg:flex-row m-5">
        <div className="card font-serif  shadow-2xl border rounded-box grid flex-grow place-items-center">
          <div className="flex flex-col gap-2 lg:gap-2">
            <img src={Bronze_Membership_Badge} alt="badge" className="w-24 mx-auto" />
            <h2 className="font-bold text-4xl lg:text-5xl text-center text-amber-600">
              {CURRENCY}350
            </h2>
          </div>
          <ul className="m-5">
            <li className="font-bold uppercase">
              <input type="checkbox" className="checkbox w-5 h-4" disabled defaultChecked/> More Swipes:
              <span className="font-normal lowercase text-sm pl-6 inline-block">
                
                (Increase daily swipe limit compare to normal.)
              </span>
            </li>
            <li className="font-bold uppercase">
              <input type="checkbox" className="checkbox w-5 h-4" disabled defaultChecked /> Limited Chat Access:
              <span className="font-normal lowercase text-sm pl-6 inline-block">
                
                (Can send up to 50 messages per match per day.)
              </span>
            </li>
            <li className="font-bold uppercase">
              <input type="checkbox" className="checkbox w-5 h-4" disabled defaultChecked /> Basic Mentorship Access:
              <span className="font-normal lowercase text-sm pl-6 inline-block">
                
                (limited to 1 session per month.)
              </span>
            </li>
            <li className="font-bold uppercase">
              <input type="checkbox" className="checkbox w-5 h-4" disabled defaultChecked /> Priority Matching :
              <span className="font-normal lowercase text-sm pl-6 inline-block">
                
               (Matches shown first in queue.)
              </span>
            </li>
            <li className="font-bold uppercase">
              <input type="checkbox" className="checkbox w-5 h-4" disabled defaultChecked /> Ad-Free Experience:
              <span className="font-normal lowercase text-sm pl-6 inline-block">
                
               (No advertisements while using the platform.)
              </span>
            </li>
            <li className="font-bold uppercase">
              <input type="checkbox" className="checkbox w-5 h-4" disabled defaultChecked /> Profile Boost:
              <span className="font-normal lowercase text-sm pl-6 inline-block">
                
               (Slightly higher visibility in search results.)
              </span>
            </li>
          </ul>
          <button onClick={()=>handleSubmit("bronze")} className="px-3 py-2 mb-3 rounded-2xl bg-amber-600 hover:bg-amber-900 text-black font-semibold">
            Buy Now
          </button>
        </div>
        <div className="divider lg:divider-horizontal font-serif">
          OR
        </div>
        <div className="card font-serif shadow-2xl border rounded-box grid flex-grow place-items-center">
          <div className="flex flex-col gap-1 lg:gap-2">
            <img src={GOld_Membership_Badge} alt="badge" className="w-24 mx-auto" />
            <h2 className="font-bold text-4xl text-center lg:text-5xl text-yellow-500">
              {CURRENCY}1200
            </h2>
          </div>
          <ul className="m-5 shadow-transparent tracking-tight">
            <li className="font-bold uppercase"><input type="checkbox" className="checkbox w-5 h-4" disabled defaultChecked /> Unlimited Swipes</li>
            <li className="font-bold uppercase">
              <input type="checkbox" className="checkbox w-5 h-4" disabled defaultChecked /> Unlimited Chat Access:
              <span className="font-normal lowercase text-sm pl-6 inline-block">
                
                (no message limits once matched)
              </span>
            </li>
            <li className="font-bold uppercase">
              <input type="checkbox" className="checkbox w-5 h-4" disabled defaultChecked /> Premium Mentorship Access:
              <span className="font-normal lowercase text-sm pl-6 inline-block">
                
                (Unlimited mentorship sessions.)
              </span>
            </li>
            <li className="font-bold uppercase">
              <input type="checkbox" className="checkbox w-5 h-4" disabled defaultChecked /> Profile Insights:
              <span className="font-normal lowercase text-sm pl-6 inline-block">
                
                (See who viewed your profile.)
              </span>
            </li>
            <li className="font-bold uppercase">
              <input type="checkbox" className="checkbox w-5 h-4" disabled defaultChecked /> Job & Startup Board:
              <span className="font-normal lowercase text-sm pl-6 inline-block">
                
                (Access exclusive tech jobs and startup connections.)
              </span>
            </li>
            <li className="font-bold uppercase">
              <input type="checkbox" className="checkbox w-5 h-4" disabled defaultChecked /> VIP Event Access:
              <span className="font-normal lowercase text-sm pl-6 inline-block">
                
                (Invitations to networking and tech meetups.)
              </span>
            </li>
          </ul>
          <button onClick={()=>handleSubmit("gold")} className="px-3 py-2 mb-3 rounded-2xl bg-yellow-500 hover:bg-yellow-700 text-black font-semibold">
            Buy Now
          </button>
        </div>
        <div className="divider lg:divider-horizontal font-serif">
          OR
        </div>
        <div className="card font-serif  shadow-2xl border rounded-box grid flex-grow place-items-center">
          <div className="flex flex-col gap-2 lg:gap-2">
            <img src={Silver_Membership_Badge} alt="badge" className="w-24 mx-auto" />
            <h2 className="font-bold text-4xl lg:text-5xl text-center text-gray-400">
              {CURRENCY}650
            </h2>
          </div>
          <ul className="m-5">
            <li className="font-bold uppercase"><input type="checkbox" className="checkbox w-5 h-4" disabled defaultChecked /> Unlimited Swipes</li>
            <li className="font-bold uppercase">
            <input type="checkbox" className="checkbox w-5 h-4" disabled defaultChecked /> Full Chat Access:
              <span className="font-normal lowercase text-sm pl-6 inline-block">
               ( No message limit once matched.)
              </span>
            </li>
            <li className="font-bold uppercase">
              <input type="checkbox" className="checkbox w-5 h-4" disabled defaultChecked /> Mentorship Access:
              <span className="font-normal lowercase text-sm pl-6 inline-block">
                
               ( Up to 2 sessions per month.)
              </span>
            </li>
            <li className="font-bold uppercase">
              <input type="checkbox" className="checkbox w-5 h-4" disabled defaultChecked /> Profile Insights:
              <span className="font-normal lowercase text-sm pl-6 inline-block">
                
               ( See who viewed your profile.)
              </span>
            </li>
            <li className="font-bold uppercase">
              <input type="checkbox" className="checkbox w-5 h-4" disabled defaultChecked /> Priority Matching:
              <span className="font-normal lowercase text-sm pl-6 inline-block">
                
               ( Matches shown first in queue.)
              </span>
            </li>
            <li className="font-bold uppercase">
              <input type="checkbox" className="checkbox w-5 h-4" disabled defaultChecked /> Exclusive Chat Requests:
              <span className="font-normal lowercase text-sm pl-6 inline-block">
                
               ( Can message 3 people per month without a match.)
              </span>
            </li>
            <li className="font-bold uppercase">
              <input type="checkbox" className="checkbox w-5 h-4" disabled defaultChecked />only for 6months
              
            </li>
          </ul>
          <button onClick={()=>handleSubmit("silver")} className="px-3 py-2 mb-3 rounded-2xl bg-gray-500 hover:bg-gray-700 text-black font-semibold">
            Buy Now
          </button>
        </div>
      </div>
    </div> 
    )
    }
    </>
  );
};

export default Premium;
