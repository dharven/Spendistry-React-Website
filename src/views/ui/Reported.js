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




const Reported = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem('email') !== null ) {
        var email = localStorage.getItem('email')
      } else {
        var email = sessionStorage.getItem('email')
      }
      const result = await axios(
        'https://cdbd-18-212-22-122.ngrok.io/report/reportBy/' + email,
      );

      setData(result.data);
      console.log(result.data)     
      
    };

    fetchData();
  } , []);

  return (
    
    <div>
      <Row>
    <Col md="6" lg="4">

{data.map((item) => (                   
    
      <Card>
        <p id="name-reported">Business Name: {item.reportTo}</p>
        <p id="name-reported">Email: {item.reportBy}</p>
        <p id="name-reported">Phone: {item.customerNumber}</p>
        <p id="name-reported">Date: {item.reportTime}</p>
        <p id="name-reported">Time: {item.reportTime}</p>
        <p id="name-reported">Reason: {item.reportReason}</p>
      </Card>
  
     ))}
       </Col>
  </Row>
    </div>
  );
};

export default Reported;