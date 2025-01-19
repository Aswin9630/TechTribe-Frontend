import Navbar from "./Navbar"
import Footer from "./Footer"
import Home from "./Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Login from "./Login"
import Profile from "./Profile"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Body = () => {  

    const AppLayout = ()=>{
        return (
            <div className='flex flex-col min-h-screen'>
                <ToastContainer autoClose={2000}/>
            <Navbar />
              <div className='flex-grow'>
                <Outlet />
              </div>
            <Footer />
          </div>
          )
    }

    const appRouter = createBrowserRouter([
        {
            path:"/",
            element:<AppLayout/>,
            children:[
                {
                    path:"/",
                    element:<Home />
                },
                {
                    path:"/login",
                    element:<Login />
                },
                {
                    path:"/signup",
                    element:<Login />
                },
                {
                    path:"/about",
                    element:<About />
                },
                {
                    path:"/contact",
                    element:<Contact />
                },
                {
                    path:"/profile",
                    element:<Profile />
                },

            ]
        }
    ])

    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    )
 
}

export default Body