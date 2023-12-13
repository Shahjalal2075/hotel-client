import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Room from "../Pages/Room/Room";
import RoomDetails from "../Pages/RoomDetails/RoomDetails";
import MyBooking from "../Pages/MyBooking/MyBooking";
import PrivateRoute from "./PrivateRoute";
import Profile from "../Pages/Profile/Profile";
import EditProfile from "../Pages/Profile/EditProfile";
import Payment from "../Pages/Payment/Payment";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/profile",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: "/edit",
                element: <PrivateRoute><EditProfile></EditProfile></PrivateRoute>
            },
            {
                path: "/room",
                element: <Room></Room>
            },
            {
                path: "/payment",
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: "/room/:title",
                element: <RoomDetails></RoomDetails>,
                loader: ({ params }) => fetch(`https://hotel-server-three.vercel.app/rooms/${params.title}`)
            },
            {
                path: "/booking",
                element: <PrivateRoute><MyBooking></MyBooking></PrivateRoute>
            }
        ]
    },
]);

export default Routes;