import Navbar from "./Navbar"
import Footer from "./Footer"
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import Login from "./Login"
import Profile from "./Profile"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"


const Body = () => {

    const AppLayout = ()=>{
        return (
            <div className='flex flex-col min-h-screen'>
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