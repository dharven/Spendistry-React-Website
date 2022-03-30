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

  return (
    
    <div>
     
    <Row>
    <Col md="6" lg="4">
      <Card>
        <p id="name-reported">Business Name:</p>
        <p id="name-reported">Email:</p>
        <p id="name-reported">Phone:</p>
        <p id="name-reported">Date:</p>
        <p id="name-reported">Time:</p>
        <p id="name-reported">Reason:</p>
        {/* <div>
          <Button color="light-danger">{data[0]._id}</Button>
        </div> */}
      </Card>
      
    </Col>
    
  </Row>
     
     
    </div>
  );
};

export default Reported;