import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Profile from "../Pages/Profile/Profile";
import DashboardLayout from "../layout/DashboardLayout";
import AddCourse from "../Pages/Dashboard/AddCourse/AddCourse";
import AllCourse from "../Pages/Dashboard/AllCourse/AllCourse";
import AllSales from "../Pages/Dashboard/Sales/AllSales";
import Orders from "../Pages/Dashboard/Orders/Orders";
import Courses from "../Pages/Courses/Courses";
import CourseDetails from "../Pages/CourseDetails/CourseDetails";
import PrivateRoute from "./PrivateRoute";
import Payment from "../Pages/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/courses/:id",
        element: <CourseDetails />,
      },
      {
        path: "/payment/:id",
        element: <Payment />,
        loader: ({ params }) =>
          fetch(
            `https://web-intern-server-production.up.railway.app/app/course/${params.id}`
          ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/add-course",
        element: <AddCourse />,
      },
      {
        path: "/dashboard/all-course",
        element: <AllCourse />,
      },
      {
        path: "/dashboard/sales",
        element: <AllSales />,
      },
      {
        path: "/dashboard/orders",
        element: <Orders />,
      },
    ],
  },
]);
