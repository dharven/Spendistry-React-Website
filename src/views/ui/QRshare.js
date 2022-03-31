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
import { useParams } from 'react-router-dom'



const QRshare = (params) => {

  const [data, setData] = useState("");
  const {id} = useParams();
useEffect(() => {
  setData(id.replaceAll("₹", '/'));
},[]);
 

  
  return (
    //center div vertically
    // <div  style={{justifyContent : "center", alignItems : "center", display : "flex", flexDirection : "column"}}>
      <div>    
     <div  style={{justifyContent : "center", alignItems : "center", display : "flex", flexDirection : "column",margin:"auto",
     position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
     }}> 
    
   
    

      <Card body className="text-center" >
      <CardText  >
    This is your QR
    </CardText>
        <CardText  >
        <QRCode value={data} />
        </CardText>
        {/* <div>
          <Button color="white"><i class="bi bi-share" ></i></Button>
      </div> */}
      </Card>
    
   
  
     
     
    </div>
    </div>

  );
};

export default QRshare;