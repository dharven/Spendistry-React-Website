import { Col, Row } from "reactstrap";
import React, {useState,useEffect} from 'react'
import ProjectTables from "../components/dashboard/ProjectTable";
import {
  Card,
  CardText,
  CardTitle, 
  Button,
} from "reactstrap";
import axios from 'axios';
import "./dashboard.css"
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";



const Starter = () => {

  const [data, setData] = useState([{MonthlyTotalAll:"", AllTimeTotal:"", qr:""}]);
  const [qr, setQr] = useState('');
  const [notify, setNotify] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      sessionStorage.removeItem('id');
      if (localStorage.getItem('email') !== null ) {
        var email = localStorage.getItem('email')
      } else {
        var email = sessionStorage.getItem('email')
      }
      const result = await axios(
        'https://cdbd-18-212-22-122.ngrok.io/invoice/total/' + email,
      );

      setData(result.data);
      var QR = result.data[0].qr.replaceAll("/", '₹');

      setQr(QR);
      console.log(result.data)     
      
    };

    fetchData();
  }, []);

  const handleShare = (e) => {
    e.preventDefault();
    navigator.clipboard
  .writeText("https://spendistry.netlify.app/#/Qrshare/"+qr)
  .then(() => {console.log("Copied to clipboard")
      setNotify("Copied to clipboard")
      setTimeout(function(){
        setNotify(null)
     }, 2000);
})
  .catch((err) => console.log(err))
  }

  
  return (
    
    <div>
     
    <Row>
    <Col md="6" lg="4">
      <Card body className="text-center">
        <CardTitle tag="h5">Monthly Expenses</CardTitle>
        <CardText>
       <h3>₹{data[0].MonthlyTotalAll}</h3> 
        </CardText>
        {/* <div>
          <Button color="light-danger">{data[0]._id}</Button>
        </div> */}
      </Card>
    </Col>
    <Col md="6" lg="4">
      <Card body className="text-center">
        <CardTitle tag="h5">Total Expenses</CardTitle>
        <CardText>
        <h3>₹{data[0].AllTimeTotal}</h3>
        </CardText>
        {/* <div>
          <Button color="light-danger">{data[0]._id}</Button>
        </div> */}
      </Card>
    </Col>
    
    <Col md="6" lg="4">
      <Card body className="text-center">
        <CardTitle tag="h5">Your QR Code</CardTitle>
        <CardText>
        <QRCode value={data[0].qr} size={100}/>
        </CardText>
        <div>
          <Button onClick={handleShare} color="white"><i class="bi bi-share" ></i></Button>
          <p id="notify">{notify}</p>
        </div>
      </Card>
    </Col>
   
  </Row>
     
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row>
     
     
    </div>
  );
};

export default Starter;