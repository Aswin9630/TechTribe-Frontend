import React from 'react'
import contact_img from "../assets/contact_us.png"

const Contact = () => {
  return (
    <div className='flex flex-col lg:flex-row items-center'>
      <div className='lg:w-1/2 mx-20'>
        <img src={contact_img} alt="contact-image" className='w-96 h-54 lg:mx-3'/>
      </div>

        <div className='lg:w-1/2 my-9 text-2xl'>
          <p className='font-bold text-amber-700'>Address :</p>
          <p className=''>456 Trendy Lane, <br />Sector 19, Dwarka, <br />New Delhi, Delhi 110328, <br />India</p>
          <p className='mt-5'><span className='text-amber-700'>Phone:</span> +91 9876543210 </p>
          <p><span className='text-amber-700'>Email:</span> support@thetechtribe.xyz</p>
        </div>
    </div>
  )
} 

export default Contact