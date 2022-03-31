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



const QRshare = () => {

  const [data, setData] = useState([{qr:""}]);

 

  
  return (
    
    <div>
     
    
   
    

      <Card body className="text-center">
      
        <CardText>
        <QRCode value={data[0].qr} size={700}/>
        </CardText>
        {/* <div>
          <Button color="white"><i class="bi bi-share" ></i></Button>
        </div> */}
      </Card>
    
   
  
     
     
    </div>
  );
};

export default QRshare;