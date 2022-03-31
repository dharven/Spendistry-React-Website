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
    
    <div>
     
    
   
    

      <Card body className="text-center">
      
        <CardText>
        <QRCode value={data} size={700}/>
        </CardText>
        {/* <div>
          <Button color="white"><i class="bi bi-share" ></i></Button>
        </div> */}
      </Card>
    
   
  
     
     
    </div>
  );
};

export default QRshare;