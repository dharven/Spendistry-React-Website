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
import "./dashboard.css"
import QRCode from "react-qr-code";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryStack, VictoryAxis } from 'victory';
import SnackBar from '@material-ui/core/SnackBar';
import IconButton from '@material-ui/core/IconButton';
import { SnackbarContent } from "@material-ui/core";



const Starter = () => {

  const [data, setData] = useState([{MonthlyTotalAll:"", AllTimeTotal:"", qr:""}]);
  const [qr, setQr] = useState('');
  const [notify, setNotify] = useState('');
  const [height, setheight] = useState(null)
  const [snackbar, setSnackbar] = useState({open:false, message:'', color:''});
  // const data2012 = [
  //   {quarter: 1, earnings: 13000},
  //   {quarter: 2, earnings: 16500},
  //   {quarter: 3, earnings: 14250},
  //   {quarter: 4, earnings: 19000},
  //   {quarter: 5, earnings: 12500},
  //   {quarter: 6, earnings: 15000},
  //   {quarter: 7, earnings: 11500},
  //   {quarter: 8, earnings: 18000},
  //   {quarter: 9, earnings: 13000},
  //   {quarter: 10, earnings: 19500},
  // ];
  const [roundoff, setRoundoff] = useState([0, 0]);

  useEffect(() => {
    //dissable scroll
    // Initialize editor.
    setheight(window.innerHeight)
    // document.getElementsByClassName("text-center")[0].style.cssText = "background: #90e0ef;";
    // document.getElementsByClassName("text-center")[1].style.cssText = "background: #90e0ef;";
    // document.getElementsByClassName("text-center")[2].style.cssText = "background: #90e0ef;";
    // document.getElementsByClassName("text-center")[3].style.cssText = "background: #90e0ef;";
    // document.getElementsByClassName("text-center")[2].style.cssText = "background: #00B4D8;";
    console.log(document.getElementsByTagName("h5"))
    document.body.style.overflow = "hidden";
    const fetchData = async () => {
      sessionStorage.removeItem('id');
      if (localStorage.getItem('email') !== null ) {
        var email = localStorage.getItem('email')
      } else {
        var email = sessionStorage.getItem('email')
      }
      const result = await axios(
        process.env.REACT_APP_SPENDISTRY_API+'invoice/total/' + email,
      );

      setData(result.data);
      var QR = result.data[0].qr.replaceAll("/", '₹');

      setQr(QR);
      console.log(result.data)    
      
      var temp = [];
      var index = 1;

      //set roundoff array in state  
      for(var i=0; i<result.data.length; i++){
        for(var j=0; j<result.data[i].roundoff.length; j++){
          temp.push({
            quarter: index++,
            earnings: result.data[i].roundoff[j]
          })
        }
      }
      setRoundoff(temp);
    };

    fetchData();
  }, []);

  const handleShare = (e) => {
    e.preventDefault();
    navigator.clipboard
  .writeText(window.location.hostname+"/#/Qrshare/"+qr)
  .then(() => {console.log(window.location.hostname);
      // setSnackbarMessage("Copied to clipboard")
      setSnackbar({open:true, message:" Copied to clipboard", color:"#005EFC"});
})
  .catch((err) => console.log(err))
  }

  return (
    
    <div>
      <SnackBar
      anchorOrigin={{vertical: 'bottom', horizontal: "center"}}
      open={snackbar.open}
      autoHideDuration={2000}
      onClose={() => setSnackbar({open:false})}>
     <SnackbarContent
      style={{backgroundColor: snackbar.color}}
      message={<i class="bi bi-clipboard">{snackbar.message}</i>}/> 
      </SnackBar>
    {(() => {
        if (window.innerWidth < 768) {
          return (
            <div style={{overflowY:"scroll" ,overflowX:"clip", height:height-100}}>
             <Row>
                <Col md="6" lg="4">
 
   
      <Card body className="text-center cardM"  >
        <CardTitle tag="h5" style={{color:"#03045E"}}>Monthly Expenses</CardTitle>
        <CardText>
       <h3  style={{color:"#03045E"}}>₹{data[0].MonthlyTotalAll}</h3> 
        </CardText>
        {/* <div>
          <Button color="light-danger">{data[0]._id}</Button>
        </div> */}
         </Card>

      
      <Card body className="text-center cardD">
        <CardTitle tag="h5" style={{color:"#03045E"}}>Total Expenses</CardTitle>
        <CardText>
        <h3  style={{color:"#03045E"}}>₹{data[0].AllTimeTotal}</h3>
        </CardText>
        {/* <div>
          <Button color="light-danger">{data[0]._id}</Button>
        </div> */}
      </Card>
    
   
    </Col>
    <Col md="6" lg="4">
    
      <Card body className="text-center cardD" id="graph-card">

        <VictoryChart
        domainPadding={10}
        theme={VictoryTheme.material}
        height={190}
        >
          <VictoryStack>
            
      <VictoryBar
            data={roundoff}
            x="quarter"
            y="earnings"
          />
          </VictoryStack>
          </VictoryChart>
          <p id="graph-text">Expenses of recent invoice</p>
      </Card>
    </Col>
    <Col md="6" lg="4">
      <Card body className="text-center cardD">
        <CardTitle tag="h5" style={{color:"#03045E"}}>Your QR Code</CardTitle>
        <CardText>
        <QRCode value={data[0].qr} fgColor="#000000" size={100}/>
        </CardText>
        <div>
          <Button onClick={handleShare} color="white"><i class="bi bi-share" ></i></Button>
          <p id="notify">{notify}</p>
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
          )
        } else {
          return (
            // style={{overflowY:"scroll" ,overflowX:"clip", height:height-150}}
            <div >    
              <Row>
                <Col md="6" lg="4">
 
   
      <Card body className="text-center cardM"  >
        <CardTitle tag="h5" style={{color:"#03045E"}}>Monthly Expenses</CardTitle>
        <CardText>
       <h3  style={{color:"#03045E"}}>₹{data[0].MonthlyTotalAll}</h3> 
        </CardText>
        {/* <div>
          <Button color="light-danger">{data[0]._id}</Button>
        </div> */}
         </Card>

      
      <Card body className="text-center cardD">
        <CardTitle tag="h5" style={{color:"#03045E"}}>Total Expenses</CardTitle>
        <CardText>
        <h3  style={{color:"#03045E"}}>₹{data[0].AllTimeTotal}</h3>
        </CardText>
        {/* <div>
          <Button color="light-danger">{data[0]._id}</Button>
        </div> */}
      </Card>
    
   
    </Col>
    <Col md="6" lg="4">
      <Card body className="text-center cardD" id="graph-card">
        <VictoryChart
        domainPadding={10}
        theme={VictoryTheme.material}
        height={182}
        >

          <VictoryStack>
      <VictoryBar
            data={roundoff}
            x="quarter"
            y="earnings"
          />

          </VictoryStack>
          </VictoryChart>

          <p id="graph-text">Expenses of recent invoice</p>
      </Card>
    </Col>
    <Col md="6" lg="4">
      <Card body className="text-center cardD" >
        <CardTitle tag="h5" style={{color:"#03045E"}}>Your QR Code</CardTitle>
        <CardText>
        <QRCode value={data[0].qr} fgColor="#000000" size={100}/>
        </CardText>
        <div>
          <Button onClick={handleShare} color="white" id="share"><i class="bi bi-share" ></i></Button>
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
          )
        }
      })()}
    
      
       
     
    </div>
  );
};

export default Starter;