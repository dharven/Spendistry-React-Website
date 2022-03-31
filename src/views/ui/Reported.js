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




const Reported = () => {

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
        'https://cdbd-18-212-22-122.ngrok.io/report/reportBy/' + email,
      );

      setData(result.data);
      console.log(result.data)     
      
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
  <input type="search" onChange={handleSearch} class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
</div><br />
      <Row>
      

{data
.filter((item)=>{
  if(search === ''){
    return data;
  } else if((item.reportTo).toLowerCase().includes((search).toLowerCase())){
    return item;
  } else if((item.reportReason).toLowerCase().includes((search).toLowerCase())){
    return item;
  }
})
.map((item) => (
<Col md="6" lg="4">
      <Card>
        <p id="name-reported">Business Email: {item.reportTo}</p>
        <p id="name-reported">Phone: {item.businessNumber}</p>
        <p id="name-reported">Date: {(new Date(item.reportTime)).toLocaleDateString()}</p>
        <p id="name-reported">Time: {(new Date(item.reportTime)).toLocaleTimeString()}</p>
        <p id="name-reported">Reason: {item.reportReason}</p>
      </Card>
      </Col>
))}
  </Row>
    </div>
  );
};

export default Reported;