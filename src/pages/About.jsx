import about_img from '../assets/about_img.png'

const About = () => {
  return (
    <div className='flex flex-col lg:flex-row gap-4 mt-3 items-center '>
      <div className='lg:w-1/2 text-center flex'>
          <img src={about_img} alt="" className='w-40 h-72 mx-12 lg:mx-16 my-5 lg:my-3'/>
          <h1 className='font-bold my-16 text-4xl lg:text-5xl'>About Us</h1>
      </div>
      <div className='lg:w-1/2 m-3'>
          <div>
            <p className='text-center text-xl lg:text-3xl font-bold'>Welcome to TechTribe, where innovation meets community!</p>
              <div className='mt-5 lg:my-16'>
                <h1 className='font-semibold underline uppercase'>Our Mission :</h1>
                <ol type='1' className='list-decimal mx-10 lg:mx-20'>
                  <li className='my-3'>Our mission is to democratize access to tech careers, 
                  empowering individuals from all backgrounds to connect, learn, and thrive in the technology industry.</li>
                  <li className='my-3'>To build a vibrant and inclusive community where aspiring and established tech professionals can connect,
                  collaborate, and receive mentorship to support each other's career journeys.</li>
                  <li className='my-3'>Bridge the gap between aspiring tech professionals and the opportunities they
                     deserve, regardless of their background, by fostering a supportive ecosystem of mentorship and collaboration.</li>
                </ol>
              </div>
          </div>
      </div>
    </div>
  )
}

export default About