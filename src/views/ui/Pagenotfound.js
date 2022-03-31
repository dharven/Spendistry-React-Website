import { Col, Row } from "reactstrap";
import React, {useState,useEffect} from 'react'
import {
  Card,
  CardText,
  CardTitle, 
  Button,
} from "reactstrap";
import axios from 'axios';
import "../dashboard.css"
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";


const Pagenotfound = () => {

 

 

  
  return (
    
    <div>
     
    <h3 id="pagenot">404</h3><br />
    <h4 id="pagenot">Page Not Found</h4>
    <h5 id="pagenot">The page you are looking for might have been removed or had its name changed or is temporarily unavailable.</h5>
    <h6><Link to={"/"} id="pagenot">Back to homepage</Link></h6>
    
    
   
  
     
     
    </div>
  );
};

export default Pagenotfound;