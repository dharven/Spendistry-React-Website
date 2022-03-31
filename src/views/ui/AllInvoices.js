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


// https://cdbd-18-212-22-122.ngrok.io/invoice/findele/shashank@gmail.com/sha@gmail.com


const AllInvoices = () => {


  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(() => {
    if(sessionStorage.getItem('id') !== null){
    var fetchData = async () => {
      if (localStorage.getItem('email') !== null ) {
        var email = localStorage.getItem('email')
        var id = sessionStorage.getItem('id')

      } else {
        var email = sessionStorage.getItem('email')
        var id = sessionStorage.getItem('id')
      }
      const result = await axios(
        'https://cdbd-18-212-22-122.ngrok.io/invoice/findEle/' + email + "/" + id,
      );
      // console.log(result.data)
      setData(result.data[0].bussinessName[0].invoices);
      // console.log(result.data[0].bussinessName[0].invoices)     
      
    };
  } else {
    var fetchData = async () => {
      if (localStorage.getItem('email') !== null ) {
        var email = localStorage.getItem('email')
      } else {
        var email = sessionStorage.getItem('email')
      }
      const result = await axios(
        'https://cdbd-18-212-22-122.ngrok.io/invoice/' + email
      );
      // console.log("all",result.data)
      // console.log("test", result.data.businessName)
      for(var i = 0; i < result.data.businessName.length; i++){
        //for loop for invoices
        for(var j = 0; j < result.data.businessName[i].invoices.length; j++){
          // console.log("invoice", result.data.businessName[i].invoices[j])
          setData(data => [...data, result.data.businessName[i].invoices[j]]);
        }
      }
      console.log(123,123,data)
      
      // setData(result.data.businessName);
      
    };

  }

    fetchData();
  } , []);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearch(value);
   
  }

  return (
    
    <div>
     <div class="input-group">
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={handleSearch} />
</div><br />
    <Row>
    {data.filter((item)=>{
        if(search === ''){
          return data;
        } else if((item.invoiceTitle).toLowerCase().includes((search).toLowerCase())){
          return item;
        } else if((item.invoiceSentBy).toLowerCase().includes((search).toLowerCase())){
          return item;
        } else if (item.invoiceNumber == parseInt(search) ){
          return item;
        } else if ( item.invoiceTime.toString().includes( new Date(search).toLocaleDateString()) ){
          return item;
        }
      }).map((item) => (

        
     <Col md="6" lg="4">
      <Card>
       <h5 id="returned-header">{(item.invoiceTitle).toUpperCase()}</h5>
       <p id="returned-business">Business Address: {item.businessAddress}</p>
      {/* city.toUpperCase */}
       <h5 id="returned-header">SUBJECT TO {(item.city)} JURISDICTION</h5>
       <p id="returned-business">GST No: {item.gstNumber}</p>
       <p id="returned-business">Email ID: {item.invoiceSentBy}</p>
       <p id="returned-business">Phone No: {item.businessContactNo}</p>
       <p id="returned-business">Date: {(new Date(item.invoiceTime)).toLocaleDateString()}<span id="returned-igst">Time: {(new Date(item.invoiceTime)).toLocaleTimeString()}</span></p>
       
       <p id="returned-business">client: {item.invoiceSentTo}</p>
       <p id="returned-business">Invoice No: {item.invoiceNumber}</p>
       <div id="returned-x-scroll">
         <table id="returned-table">
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
         <p id="returned-business"><span >Discount: {item.discount}</span><span id="returned-igst">IGST: {item.invoiceIGST}</span><span id="returned-cgst">CGST: {item.invoiceCGST}</span></p>
         
         
         <p id="returned-business"><span >UTGST: {item.invoiceUTGST}</span><span id="returned-igst">SGST: {item.invoiceSGST}</span></p>
         
         <p id="returned-business">Net total: {item.roundoff}</p>

      
       <p id="returned-business">Payment method: {item.invoicePaymentMode}</p>
       <p id="returned-header">{item.invoiceDescription}</p>
      </Card>
      
    </Col>
    ))}
    
  </Row>
     
     
    </div>
  );
};

export default AllInvoices;