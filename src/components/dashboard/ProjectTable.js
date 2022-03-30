import React, {useState,useEffect} from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import axios from 'axios';
import "./PJ.css";
import { Navigate , Link } from 'react-router-dom';

const ProjectTables = () => {
  const [data, setData] = useState([{MonthlyTotal:"", AllTotal:""}]);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem('email') !== null ) {
        var email = localStorage.getItem('email')
      } else {
        var email = sessionStorage.getItem('email')
      }
      const result = await axios(
        
        'https://cdbd-18-212-22-122.ngrok.io/invoice/total/'+ email,
      );

      setData(result.data);
      console.log(result.data)
    };

    fetchData();
  }, []);


  const onInvoiceClick = (e, index) => {
    // e.preventDefault();
    console.log(index, data[index]._id)
    sessionStorage.setItem('id', data[index]._id)
    setIndex(index);
     
  }

  if(index !== null){
    return <Navigate  to='/Edit' />
  }

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Recent Bills</CardTitle><br />
          <div class="input-group">
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <button type="button" class="btn btn-outline-primary">search</button>
</div><br />
          
          <div id='table-scroll'>
            
          <Table className="no-wrap mt-3 align-middle"  responsive borderless>
            <thead>
              <tr>
                <th>Business Name</th>
                
                <th>Monthly Expenses</th>
                <th>Total Expenses</th>
              </tr>
            </thead>
            <tbody>
              {data.map((tdata, index) => (
             
                <tr key={index} 
                //send data to new page with row click
                onClick={() => onInvoiceClick(tdata, index)}

                className="border-top" id="shadow-effect">
                  
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src="https://cdbd-18-212-22-122.ngrok.io/vendorProfile/vendorProfile-1646648817874.jpeg"
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                  
                        <h6 className="mb-0">{tdata._id}</h6>
                        
                        <span className="text-muted">{tdata._id}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td>₹{tdata.MonthlyTotal}</td>
                  <td>₹{tdata.AllTotal}</td>
                  
                </tr>
               
              ))}
            </tbody>
          </Table>
          </div>
          
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;