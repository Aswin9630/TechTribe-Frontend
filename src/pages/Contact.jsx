import React from 'react'
import contact_img from "../assets/contact.png"

const Contact = () => {
  return (
    <div className='flex flex-col lg:flex-row m-2'>
      <div className='lg:w-1/2 m-3'>
        <img src={contact_img} alt="contact-image" className='w-96 h-54 mx-auto lg:mx-3 lg:h-auto lg:w-auto'/>
      </div>

        <div className='lg:w-1/2 text-center my-9 text-xl'>
          <p className='font-bold'>Address :</p>
          <p className=''>456 Trendy Lane, <br />Sector 19, Dwarka, <br />New Delhi, Delhi 110328, <br />India</p>
          <p className='mt-5'>Phone: +91 9876543210 </p>
          <p>Email: support@thetechtribe.xyz</p>
        </div>
    </div>
  )
} 

export default Contact