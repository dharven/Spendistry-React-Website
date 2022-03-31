import { lazy } from "react";
import { Navigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import Returned from "../views/ui/Returned.js";


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
const Reported = lazy(() => import("../views/ui/Reported.js"));
const Returned = lazy(() => import("../views/ui/Returned.js"));
const AllInvoices = lazy(() => import("../views/ui/AllInvoices.js"));
const QRshare = lazy(() => import("../views/ui/QRshare.js"));
const Pagenotfound = lazy(() => import("../views/ui/Pagenotfound.js"));
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
    element: <Pagenotfound />,
    children: [
      { path: "/Pagenotfound", element: <Navigate to="/Pagenotfound" /> },
    ],
  },
  {
    path: "",
    element: <QRshare />,
    children: [
      { path: "/QRshare", element: <Navigate to="/QRshare" /> },
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
  {
    path: "",
    element: <FullLayout />,
    children: [
      // { path: "/", element: <Navigate to="/Dashboard" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/Reported", exact: true, element: <Reported /> },
    ],
  },
  {
    path: "",
    element: <FullLayout />,
    children: [
      // { path: "/", element: <Navigate to="/Dashboard" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/Returned", exact: true, element: <Returned /> },
    ],
  },
  {
    path: "",
    element: <FullLayout />,
    children: [
      // { path: "/", element: <Navigate to="/Dashboard" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/AllInvoices", exact: true, element: <AllInvoices /> },
    ],
  },
];

export default ThemeRoutes;
