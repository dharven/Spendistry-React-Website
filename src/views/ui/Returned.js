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
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem('email') !== null ) {
        var email = localStorage.getItem('email')
      } else {
        var email = sessionStorage.getItem('email')
      }
      const result = await axios(
        process.env.REACT_APP_SPENDISTRY_API+'return/useremail/' + email,
      );

      var temp = result.data;
      console.log(temp)
      //convert unix time stamp to date
      for (var i = 0; i < temp.length; i++) {
        temp[i].invoiceDate = new Date(temp[i].invoiceTime).toLocaleDateString();
        temp[i].invoiceTime = new Date(temp[i].invoiceTime).toLocaleTimeString();
      }

      setData(temp);
      console.log(temp)     
      
    };

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
{(() => {
        if (window.innerWidth < 768) {
          return (
            <div style={{overflowY:"scroll" ,overflowX:"clip", height:window.innerHeight-170}}>
               <Row>
      {data.filter((item)=>{
        if(search === ''){
          return data;
        } else if (item.invoiceNumber == parseInt(search) ){
          return item;
        } else if((item.invoiceTitle).toLowerCase().includes((search).toLowerCase())){
          return item;
        } else if((item.invoiceSentBy).toLowerCase().includes((search).toLowerCase())){
          return item;
        } else if (item.invoiceDate.includes(search) ){
          return item;
        }
      }).map((item) => (
    <Col md="6" lg="4">
      <Card>
       <h5 id="returned-header">{(item.invoiceTitle).toUpperCase()}</h5>
       <p id="returned-business">Business Address: {item.businessAddress}</p>
       <h5 id="returned-header">SUBJECT TO {(item.city).toUpperCase()} JURISDICTION</h5>
       <p id="returned-business">GST No: {item.gstNumber}</p>
       <p id="returned-business">Email ID: {item.invoiceSentBy}</p>
       <p id="returned-business">Phone No: {item.businessContactNo}</p>
       <p id="returned-business">Date: {item.invoiceDate}<span id="returned-igst">Time: {item.invoiceTime}</span></p>
       
       <p id="returned-business">client: {item.invoiceSentTo}</p>
       <p id="returned-business">Invoice No: {item.invoiceNumber}</p>
       <div id="returned-x-scroll">
         {/* <p id="returned-business"><span id="returned-item">Item</span><span id="returned-Qnt">Qnt</span><span id="returned-Price">Price</span><span id="returned-total">Total</span></p> 
         <p id="returned-item-name">woooooooooooooooooooooooooooooooooo</p><span id="returned-Qnt-name">Qnt</span><span id="returned-Price">Price</span><span id="returned-total">Total</span> */}
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
        {/* <div>
          <Button color="light-danger">{data[0]._id}</Button>
        </div> */}
      </Card>
      
    </Col>
      ))}
    
  </Row>
            </div>
          )
        } else {
          return (
            <div style={{overflowY:"scroll" ,overflowX:"clip", height:window.innerHeight-150}}> 
             <Row>
      {data.filter((item)=>{
        if(search === ''){
          return data;
        } else if (item.invoiceNumber == parseInt(search) ){
          return item;
        } else if((item.invoiceTitle).toLowerCase().includes((search).toLowerCase())){
          return item;
        } else if((item.invoiceSentBy).toLowerCase().includes((search).toLowerCase())){
          return item;
        } else if (item.invoiceDate.includes(search) ){
          return item;
        }
      }).map((item) => (
    <Col md="6" lg="4">
      <Card>
       <h5 id="returned-header">{(item.invoiceTitle).toUpperCase()}</h5>
       <p id="returned-business">Business Address: {item.businessAddress}</p>
       <h5 id="returned-header">SUBJECT TO {(item.city).toUpperCase()} JURISDICTION</h5>
       <p id="returned-business">GST No: {item.gstNumber}</p>
       <p id="returned-business">Email ID: {item.invoiceSentBy}</p>
       <p id="returned-business">Phone No: {item.businessContactNo}</p>
       <p id="returned-business">Date: {item.invoiceDate}<span id="returned-igst">Time: {item.invoiceTime}</span></p>
       
       <p id="returned-business">client: {item.invoiceSentTo}</p>
       <p id="returned-business">Invoice No: {item.invoiceNumber}</p>
       <div id="returned-x-scroll">
         {/* <p id="returned-business"><span id="returned-item">Item</span><span id="returned-Qnt">Qnt</span><span id="returned-Price">Price</span><span id="returned-total">Total</span></p> 
         <p id="returned-item-name">woooooooooooooooooooooooooooooooooo</p><span id="returned-Qnt-name">Qnt</span><span id="returned-Price">Price</span><span id="returned-total">Total</span> */}
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
        {/* <div>
          <Button color="light-danger">{data[0]._id}</Button>
        </div> */}
      </Card>
      
    </Col>
      ))}
    
  </Row>       
            </div>
          )
        }
      })()}
   

     
    </div>
  );
};

export default Returned;