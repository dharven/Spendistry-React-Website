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




const Starter = () => {

  const [data, setData] = useState([{total:"", totalAll:""}]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://cdbd-18-212-22-122.ngrok.io/invoice/totalExpense/shashank@gmail.com',
      );

      setData(result.data);
      console.log(result.data)
    };

    fetchData();
  }, []);

  return (
    <div>
    <Row>
    <Col md="6" lg="4">
      <Card body className="text-center">
        <CardTitle tag="h5">Monthly Expenses</CardTitle>
        <CardText>
       <h3>₹{data[0].total}</h3> 
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
        <h3>₹{data[0].totalAll}</h3>
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
        <img
         src="https://www.hellotech.com/guide/wp-content/uploads/2020/05/HelloTech-qr-code-300x300.jpg"
        width="100" height="100"
        ></img>
        </CardText>
        <div>
          <Button color="white"><i class="bi bi-share" ></i></Button>
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
