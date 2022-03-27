import { lazy } from "react";
import { Navigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Dashboard = lazy(() => import("../views/Dashboard.component.js"));
const Login = lazy(() => import("../views/ui/login.component.js"));
const Signup = lazy(() => import("../views/ui/signup.component.js"));
const Forgot = lazy(() => import("../views/ui/Forgot.component.js"));
const Otp = lazy(() => import("../views/ui/Otp.component.js"));
const ChangePass = lazy(() => import("../views/ui/ChangePass.js"));
const EditProfile = lazy(() => import("../views/ui/EditProfile.js"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <Login />,
    children: [
      { path: "/sign-in", element: <Navigate to="/Login" /> },
    ],
  },

  {
    path: "",
    element: <Signup />,
    children: [
      { path: "/sign-up", element: <Navigate to="/Signup" /> },
    ],
  },
  {
    path: "",
    element: <Forgot />,
    children: [
      { path: "/Forgot", element: <Navigate to="/Forgot" /> },
    ],
  },
  {
    path: "",
    element: <Otp />,
    children: [
      { path: "/Otp", element: <Navigate to="/Otp" /> },
    ],
  },
  {
    path: "",
    element: <ChangePass />,
    children: [
      { path: "/ChangePass", element: <Navigate to="/ChangePass" /> },
    ],
  },
  {
    path: "",
    element: <FullLayout />,
    children: [
      // { path: "/", element: <Navigate to="/Dashboard" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/Edit", exact: true, element: <EditProfile /> },
    ],
  },
];

export default ThemeRoutes;
