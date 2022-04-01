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
  const [height, setheight] = useState(null)


  useEffect(() => {
    //dissable scroll
    setheight(window.innerHeight)

    document.body.style.overflow = "hidden";
    const fetchData = async () => {
      sessionStorage.removeItem('id');
      if (localStorage.getItem('email') !== null ) {
        var email = localStorage.getItem('email')
      } else {
        var email = sessionStorage.getItem('email')
      }
      const result = await axios(
        process.env.REACT_APP_SPENDISTRY_API+'invoice/total/' + email,
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
  .writeText(window.location.hostname+"/#/Qrshare/"+qr)
  .then(() => {console.log(window.location.hostname);
      setNotify("Copied to clipboard")
      setTimeout(function(){
        setNotify(null)
     }, 2000);
})
  .catch((err) => console.log(err))
  }

  
  return (
    
    <div>
    {(() => {
        if (window.innerWidth < 768) {
          return (
            <div style={{overflowY:"scroll" ,overflowX:"clip", height:height-170}}>
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
          )
        } else {
          return (
            <div style={{overflowY:"scroll" ,overflowX:"clip", height:height-150}}>    
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
          )
        }
      })()}
    
      
       
     
    </div>
  );
};

export default Starter;