import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Room from "../Pages/Room/Room";
import RoomDetails from "../Pages/RoomDetails/RoomDetails";

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
                path: "/room",
                element: <Room></Room>
            },
            {
                path: "/room/:title",
                element: <RoomDetails></RoomDetails>,
            }
        ]
    },
]);

export default Routes;