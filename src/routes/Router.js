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
    element: <FullLayout />,
    children: [
      // { path: "/", element: <Navigate to="/Dashboard" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
    ],
  },
];

export default ThemeRoutes;
