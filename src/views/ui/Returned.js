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





const Returned = () => {


  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem('email') !== null ) {
        var email = localStorage.getItem('email')
      } else {
        var email = sessionStorage.getItem('email')
      }
      const result = await axios(
        'https://cdbd-18-212-22-122.ngrok.io/return/useremail/' + email,
      );

      setData(result.data);
      console.log(result.data)     
      
    };

    fetchData();
  } , []);

  return (
    
    <div>
     <div class="input-group">
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <button type="button" class="btn btn-outline-primary">search</button>
</div><br />
    <Row>
    <Col md="6" lg="4">
      <Card>
       <h5 id="returned-header">ANDROID DEVELOPER</h5>
       <p id="returned-business">Business Address:</p>
       <p id="returned-business">GST No:</p>
       <p id="returned-business">Email ID:</p>
       <p id="returned-business">Phone No:</p>
       <p id="returned-business">Date:</p>
       <p id="returned-business">Time:</p>
       <p id="returned-business">Email ID:</p>
       <p id="returned-business">Invoice No:</p>
       <div id="returned-x-scroll">
         {/* <p id="returned-business"><span id="returned-item">Item</span><span id="returned-Qnt">Qnt</span><span id="returned-Price">Price</span><span id="returned-total">Total</span></p> 
         <p id="returned-item-name">woooooooooooooooooooooooooooooooooo</p><span id="returned-Qnt-name">Qnt</span><span id="returned-Price">Price</span><span id="returned-total">Total</span> */}
         <table>
            <tr>
              <th>Item</th>
              <th>Qnt</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
            <tr>
              <td>maggie</td>
              <td>5</td>
              <td>100</td>
              <td>500</td>
            </tr>
            <tr>
              <td>maggie</td>
              <td>5</td>
              <td>100</td>
              <td>500</td>
            </tr>
            <tr>
              <td>maggie</td>
              <td>5</td>
              <td>100</td>
              <td>500</td>
            </tr>
            <tr>
              <td>maggie</td>
              <td>5</td>
              <td>100</td>
              <td>500</td>
            </tr>
            <tr>
              <td>maggie</td>
              <td>5</td>
              <td>100</td>
              <td>500</td>
            </tr>
         </table>
         </div>
         <p id="returned-business">Discount:</p>
         <p id="returned-business">IGST:</p>
         <p id="returned-business">CGST:</p>
         <p id="returned-business">UTGST:</p>
         <p id="returned-business">SGST:</p>
         <p id="returned-business">Net total:</p>
       
      
       <p id="returned-business">Payment method:</p>
        {/* <div>
          <Button color="light-danger">{data[0]._id}</Button>
        </div> */}
      </Card>
      
    </Col>
    
  </Row>
     
     
    </div>
  );
};

export default Returned;