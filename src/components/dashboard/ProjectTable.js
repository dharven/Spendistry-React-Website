import React, {useState,useEffect} from 'react'
import { Card, CardBody, CardTitle, Row, Table } from "reactstrap";
import axios from 'axios';
import "./PJ.css";
import { Navigate , Link } from 'react-router-dom';

const ProjectTables = () => {
  const [data, setData] = useState([{MonthlyTotal:"", AllTotal:"", _id:""}]);
  const [index, setIndex] = useState(null);
  const [search, setSearch] = useState('');
  const [name, setName] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

    // document.getElementsByClassName("container")[0].style.cssText = "background: #00B4D8;";
      if (localStorage.getItem('email') !== null ) {
        var email = localStorage.getItem('email')
      } else {
        var email = sessionStorage.getItem('email')
      }
      const result = await axios(
        
        process.env.REACT_APP_SPENDISTRY_API+'invoice/total/'+ email,
      );
      
      if(result.data[0]._id == "No data found"){
        document.getElementsByClassName("text-muted")[0].innerHTML = ""
      } else {

        var temp = []
        result.data.map((item, index) => {
          temp.push(item._id.split("@")[0])
        })
        setName(temp);
      }

      setData(result.data);
      console.log(result.data)
    };

    fetchData();
  }, []);


  const onInvoiceClick = (e, index) => {
    // e.preventDefault();
    console.log(index, data[index]._id)
    if(data[index]._id !== "No data found"){
      sessionStorage.setItem('id', data[index]._id)      
    setIndex(index);
    }
     
  }



  if(index !== null){
    return <Navigate  to='/AllInvoices' />
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearch(value);
  }

  return (
    <div >
      {/* <Card className='container' > */}
        <CardBody >
          <br/>
          <div class="input-group">
  <input type="search" id="search" onChange={handleSearch} class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
</div><br />
          
          <div id='table-scroll'>
          <Table className="no-wrap mt-3 align-middle"  responsive borderless>
            
            <tbody>
              {data.filter((item)=>{
                if(search === ''){
                  return data;
                } else if((item._id).toLowerCase().includes((search).toLowerCase())){
                  return item;
                }
              }).map((tdata, index) => (
                <Card id="tCard">
                  <CardBody>
                    <Table responsive borderless>
                      <thead>
                      <tr id='tHead'>
                <th style={{paddingLeft:"20px"}}>Business Name</th>
                <th  style={{textAlign: "center", verticalAlign: "middle"}}>Monthly Expenses</th>
                <th  style={{textAlign: "center", verticalAlign: "middle"}}>Total Expenses</th>
                </tr>
                      </thead>
                    <tbody>
                <tr key={index} 
                //send data to new page with row click
                // className="border-top" //to show white line
                onClick={() => onInvoiceClick(tdata, index)} id='tRow'
                >
                   {/* <Card> */}
                  <td>
                   
                    <div className="align-items-center p-2" id="table-row">
                      <img
                        src={ process.env.REACT_APP_SPENDISTRY_API+"vendorProfile/"+tdata._id+".jpeg"}
                        className="rounded-circle"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                          "https://i.ibb.co/pKg43FF/no-dp.jpg";
                        }}
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">   
                      
                        <h6 className="mb-0">{name[index]}</h6>
                        <span className="text-muted">{tdata._id}</span>
                      </div>
                    </div>
                    
                   
                    
                  </td>
                
                  <h6 class="resHtag">Monthly Expenses: </h6>
                  <td class="expData" >₹{tdata.MonthlyTotal}</td>
                  
                  <h6 class="resHtag">Total Expenses: </h6>
                  <td  class="expData">₹{tdata.AllTotal}</td>
                  
                  {/* </Card> */}
                </tr>
                </tbody>
                </Table>
                </CardBody>
              </Card>
              ))}
          
            </tbody>
          </Table>
          </div>
          
        </CardBody>
      {/* </Card> */}
    </div>
  );
};

export default ProjectTables;