import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./SignUp";
import ShimmerUI from "./ShimmerUI";

const About = lazy(()=>import("../pages/About"));
const Contact = lazy(()=>import("../pages/Contact"));
const Chat = lazy(()=>import("./Chat"));
const Connection = lazy(()=>import("./Connection"));
const Premium = lazy(()=>import("./Premium"));
const RequestReceived = lazy(()=>import("./RequestReceived"));
const Profile = lazy(()=>import("./Profile"));

const Body = () => {
  const AppLayout = () => {
    return (
      <div className="flex flex-col min-h-screen">
        <ToastContainer autoClose={2000} />
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  };

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/connections",
          element:(
            <Suspense fallback={<ShimmerUI/>}>
              <Connection />
            </Suspense>
          ) ,
        },
        {
          path: "/requests",
          element:(
            <Suspense fallback={<ShimmerUI/>}>
              <RequestReceived />
            </Suspense>
          ) ,
        },
        {
          path: "/premium",
          element:(
            <Suspense fallback={<ShimmerUI/>}>
              <Premium />
            </Suspense>
          ) ,
        },
        {
          path: "/chat/:userId",
          element:(
            <Suspense fallback={<ShimmerUI/>}>
              <Chat/>
            </Suspense>
          ) 
        },
        {
          path: "/about",
          element: (
            <Suspense fallback={<ShimmerUI/>}>
                <About />
            </Suspense>
          ),
        },
        {
          path: "/contact",
          element:(
            <Suspense fallback={<ShimmerUI/>}>
                <Contact/>
            </Suspense>
          ), 
        },
        {
          path: "/profile",
          element: (
            <Suspense fallback={<ShimmerUI/>}>
              <Profile />
            </Suspense>
          ) ,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
