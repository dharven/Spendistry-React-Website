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
      {data.map((item) => (
    <Col md="6" lg="4">
      <Card>
       <h5 id="returned-header">ANDROID DEVELOPER</h5>
       <p id="returned-business">Business Address: {item.businessAddress}</p>
       <p id="returned-business">GST No: {item.getNumber}</p>
       <p id="returned-business">Email ID: {item.invoiceSentBy}</p>
       <p id="returned-business">Phone No: {item.businessContactNo}</p>
       <p id="returned-business">Date: {(new Date(item.invoiceTime)).toLocaleDateString()}</p>
       <p id="returned-business">Time: {(new Date(item.invoiceTime)).toLocaleTimeString()}</p>
       <p id="returned-business">client: {item.invoiceSentTo}</p>
       <p id="returned-business">Invoice No: {item.invoiceNumber}</p>
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
            {
              item.invoiceTotalitems.map((item) => (
<tr>
              <td>{item.itemName}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.total}</td>
            </tr>
              ))
            }
            
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
      ))}
    
  </Row>
     
     
    </div>
  );
};

export default Returned;