import { Col, Row } from "reactstrap";
import React, {useState,useEffect} from 'react'
import fileDownload from 'js-file-download';
// import { Modal } from "react-responsive-modal";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import SnackBar from '@material-ui/core/SnackBar';
import IconButton from '@material-ui/core/IconButton';
import { SnackbarContent } from "@material-ui/core";

import {
  Card,
  CardText,
  CardTitle, 
  Button,
} from "reactstrap";
import axios from 'axios';
import "../dashboard.css"

const AllInvoices = () => {


  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  // const [message, setMessage] = useState('');
  const [item, setItem] = useState({});
  const [height, setheight] = useState(null)
  const [snackbar, setSnackbar] = useState({open:false, message:'', color:'', icon:''});


  //modal
  // const [open, setOpen] = useState(false);
  // const onOpenModal = () => setOpen(true);
  // const onCloseModal = () => setOpen(true)
  const [show, setShow] = useState(false);
  const handleShow = (item) => {
    setShow(true);
    setItem(item);
  }
  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
    console.log(e.target.innerHTML)
    if(e.target.innerHTML === "Report"){
      axios.post( process.env.REACT_APP_SPENDISTRY_API+'report',{
        "reportBy":item.invoiceSentTo,
        "reportTo":item.invoiceSentBy,
        "customerNumber": "",
        "customerName": "",
        "businessName": item.invoiceTitle,
        "businessNumber": item.businessContactNo,
        "reportReason": document.getElementById('reason').value,
        "InvoiceID": item._id,
      }).then(res => {
        console.log(res)
        // setMessage("Reported successfully")
        setSnackbar({open:true, message:"Reported successfully", color:"#005EFC", icon:"bi bi-exclamation-octagon-fill"});
  
        setShow(false)
      }).catch(err => {
        console.log(err)
        // setMessage("Error occured")
        setSnackbar({open:true, message:"Something went wrong!!", color:"red", icon:"bi bi-exclamation-octagon-fill"});
  
        setShow(false)
      })

    //   setTimeout(function(){
    //     // setMessage(null)
    //  }, 4000);
    } else {
      setShow(false)
    }

    
    
  }

  const handleCross = () => setShow(false);
  



  useEffect(() => {
    console.log("height",window.innerWidth)
    setheight(window.innerHeight)
    document.body.style.overflow = 'hidden';
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
        process.env.REACT_APP_SPENDISTRY_API+'invoice/findEle/' + email + "/" + id,
      );
      // console.log(result.data)
      var temp = result.data[0].bussinessName[0].invoices;
      //convert unix time stamp to date
      for (var i = 0; i < temp.length; i++) {
        temp[i].invoiceDate = new Date(temp[i].invoiceTime).toLocaleDateString();
        temp[i].invoiceTime = new Date(temp[i].invoiceTime).toLocaleTimeString();
      }

      setData(temp);
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
        process.env.REACT_APP_SPENDISTRY_API+'invoice/' + email
      );
      // console.log("all",result.data)
      // console.log("test", result.data.businessName)

      var temp = [];

      for(var i = 0; i < result.data.businessName.length; i++){
        for(var j = 0; j < result.data.businessName[i].invoices.length; j++){
          temp.push(result.data.businessName[i].invoices[j]);

          // setData(data => [...data, result.data.businessName[i].invoices[j]]);
        }
      }

      for (var i = 0; i < temp.length; i++) {
        temp[i].invoiceDate = new Date(temp[i].invoiceTime).toLocaleDateString();
        temp[i].invoiceTime = new Date(temp[i].invoiceTime).toLocaleTimeString();
      }
      setData(temp);
      console.log(123,123,temp)
      
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

  const pdfDownload = async (item) => {
    console.log("pdf", item)
    const pdf = await axios.get(
      process.env.REACT_APP_SPENDISTRY_API+'pdf/' + item.invoiceSentTo + "/" + item.invoiceSentBy + "/" + item._id,
      {
        responseType: 'blob'
      }
    ).then(res => {
      console.log("pdf", res.data)
      fileDownload(res.data, item.invoiceSentBy+"_"+item.roundoff+".pdf");
      setSnackbar({open:true, message:"Downloaded successfully", color:"#005EFC", icon:"bi bi-download"});

      
    }).catch(err => {
      console.log(err)
    })

    }
  

    return (
    
    <div>
      <Modal show={show} onHide={handleCross}>
        <Modal.Header closeButton>
          <Modal.Title>Reason for reporting</Modal.Title>
        </Modal.Header>
        <Modal.Body><textarea cols={60} rows={4} id="reason"></textarea></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" id="sendReport" onClick={handleClose} >
            Report
          </Button>
        </Modal.Footer>
      </Modal>
      <SnackBar
      anchorOrigin={{vertical: 'bottom', horizontal: "center"}}
      open={snackbar.open}
      autoHideDuration={2000}
      onClose={() => setSnackbar({open:false})}>
     <SnackbarContent
      style={{backgroundColor: snackbar.color}}
      message={<i class={snackbar.icon}> {snackbar.message}</i>}/> 
      </SnackBar>
      
     <div class="input-group">
   <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={handleSearch} />
    </div><br />
    {(() => {
        if (window.innerWidth < 768) {
          return (
            <div style={{overflowY:"scroll" ,overflowX:"clip", height:height-170}}>
                <Row style={{marginBottom:"50"}}>
    
    {data.filter((item)=>{
        if(search === ''){
          return data;
        } else if (item.invoiceNumber == parseInt(search) ){
          //not returning desired output
          return item;
        } else if((item.invoiceTitle).toLowerCase().includes((search).toLowerCase())){
          return item;
        } 
        //uncomment this after deleting dummy data
        // else if((item.invoiceSentBy).toLowerCase().includes((search).toLowerCase())){
        //   return item;
        // } 
        else if (item.invoiceDate.includes(search) ){
          return item;
        }
      }).map((item) => (

     <Col md="6" lg="4">
      <Card>
       <h5 id="returned-header">{(item.invoiceTitle).toUpperCase()}
     {/* <div> */}
       <span id="all-exclaim-logo"onClick={()=>handleShow(item)} style={{cursor:"pointer"}}><i class="bi bi-exclamation-octagon-fill" ></i></span>


       <span id="all-exclaim-download" onClick={() => pdfDownload(item)} style={{cursor:"pointer"}}>
        
         
       {/* <a href={"https://cdbd-18-212-22-122.ngrok.io/pdf/"+  item.invoiceSentTo + "/" + item.invoiceSentBy + "/" + item._id} download="invoice.pdf"> */}
       {/* <span id="all-exclaim-download" > */}

         <i class="bi bi-download" ></i></span>
         
        {/* </div> */}
        {/* </a> */}
         </h5>
         
       <p id="returned-business">Business Address: {item.businessAddress}</p>
      {/* city.toUpperCase */}
       <h5 id="returned-header">SUBJECT TO {(item.city)} JURISDICTION</h5>
       <p id="returned-business">GST No: {item.gstNumber}</p>
       <p id="returned-business">Email ID: {item.invoiceSentBy}</p>
       <p id="returned-business">Phone No: {item.businessContactNo}</p>
       <p id="returned-business">Date: {item.invoiceDate}<span id="returned-igst">Time: {item.invoiceTime}</span></p>
       
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
          )
        } else {
          return (
            <div style={{overflowY:"scroll" ,overflowX:"clip", height:height-100}}>
                <Row style={{marginBottom:"50"}}>
    
    {data.filter((item)=>{
        if(search === ''){
          return data;
        } else if (item.invoiceNumber == parseInt(search) ){
          //not returning desired output
          return item;
        } else if((item.invoiceTitle).toLowerCase().includes((search).toLowerCase())){
          return item;
        } 
        //uncomment this after deleting dummy data
        // else if((item.invoiceSentBy).toLowerCase().includes((search).toLowerCase())){
        //   return item;
        // } 
        else if (item.invoiceDate.includes(search) ){
          return item;
        }
      }).map((item) => (

     <Col md="6" lg="4">
      <Card>
       <h5 id="returned-header">{(item.invoiceTitle).toUpperCase()}
     {/* <div> */}
       <span id="all-exclaim-logo"onClick={()=>handleShow(item)} style={{cursor:"pointer"}}><i class="bi bi-exclamation-octagon-fill" ></i></span>


       <span id="all-exclaim-download" onClick={() => pdfDownload(item)} style={{cursor:"pointer"}}>
        
         
       {/* <a href={"https://cdbd-18-212-22-122.ngrok.io/pdf/"+  item.invoiceSentTo + "/" + item.invoiceSentBy + "/" + item._id} download="invoice.pdf"> */}
       {/* <span id="all-exclaim-download" > */}

         <i class="bi bi-download" ></i></span>
         
        {/* </div> */}
        {/* </a> */}
         </h5>
         
       <p id="returned-business">Business Address: {item.businessAddress}</p>
      {/* city.toUpperCase */}
       <h5 id="returned-header">SUBJECT TO {(item.city)} JURISDICTION</h5>
       <p id="returned-business">GST No: {item.gstNumber}</p>
       <p id="returned-business">Email ID: {item.invoiceSentBy}</p>
       <p id="returned-business">Phone No: {item.businessContactNo}</p>
       <p id="returned-business">Date: {item.invoiceDate}<span id="returned-igst">Time: {item.invoiceTime}</span></p>
       
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
          )
        }
      })()}
    
  
  {/* </div> */}
     
    </div>
 
  );
};

export default AllInvoices;