import React, {useState,useEffect} from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import axios from 'axios';
import "./PJ.css";

const ProjectTables = () => {
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
      <Card>
        <CardBody>
          <CardTitle tag="h5">Recent Bills</CardTitle>
          
          <div id='table-scroll'>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Business Name</th>
                
                <th>Monthly Expenses</th>
                <th>Total Expenses</th>
              </tr>
            </thead>
            <tbody>
              {data.map((tdata, index) => (
             
                <tr key={index} className="border-top" id="shadow-effect">
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
                  
                  <td>₹{tdata.total}</td>
                  <td>₹{tdata.totalAll}</td>
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
