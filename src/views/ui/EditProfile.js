import React, { Component, Fragment, useState, useEffect } from "react";
import axios from "axios";
import SnackBar from '@material-ui/core/SnackBar';
import IconButton from '@material-ui/core/IconButton';
import { SnackbarContent } from "@material-ui/core";

import {
    Card,
    CardText,
    CardTitle, 
    Button,
  } from "reactstrap";

import "./login.index.css";
import { Link , Navigate } from 'react-router-dom';

function EditProfile(props) {

    const [ fname, setfname] = useState("")
    const [ lname, setlname] = useState("")
    const [emails, setemails] = useState("")
    const [ mobileNumber, setmobileNumber] = useState("")
    const [ address, setaddress] = useState("")
    const [show, setShow] = useState("")
    const [confimation, setconfimation] = useState(null)
    const [height, setheight] = useState(null)
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('testing');
    
    useEffect(() => {
        if (localStorage.getItem('email') !== null ) {
            var email = localStorage.getItem('email')
          } else {
            var email = sessionStorage.getItem('email')
          }

        const handlegetdata = async () => {
            const { data} = await axios.get( process.env.REACT_APP_SPENDISTRY_API+"user/"+email)
            setfname(data.fname)
            setlname(data.lname)
            setemails(email)
            setmobileNumber(data.mobileNumber)
            setaddress(data.address)
            console.log(data, data.fname,  process.env.REACT_APP_SPENDISTRY_API+"user/"+email)
          }
          handlegetdata()
        },[])

        

        const handleSubmit = async () => {
            let patchdata = ({
                fname,
                lname,
                emails,
                mobileNumber,
                address,
            })
    
            const headers = {
              'Content-Type': 'Application/Json',
              'Accept': 'Application/Json'
              }
            const { data} = await axios.patch( process.env.REACT_APP_SPENDISTRY_API+`user/${emails}`, patchdata)
            console.log(patchdata)
            setconfimation("Profile Updated")
            //set Timeout
            setTimeout(() => {
                setconfimation(null)
            }, 2500);
          }

          // for image get 
          const [img, setImg] = useState();
                    useEffect(() => {
                        document.body.style.overflowX = 'hindden';
                        setheight(window.innerHeight)
                        if (localStorage.getItem('email') !== null ) {
                            var email = localStorage.getItem('email')
                          } else {
                            var email = sessionStorage.getItem('email')
                          }
                        const fetchImage = async () => {
                            const res = await fetch( process.env.REACT_APP_SPENDISTRY_API+`userProfile/${email}.jpeg`);
                            if(res.status == 404){
                                setImg(`https://i.ibb.co/pKg43FF/no-dp.jpg`)
                            } else {
                            const imageBlob = await res.blob();
                            const imageObjectURL = URL.createObjectURL(imageBlob);
                            setImg(imageObjectURL);
                            }
                        };
                        fetchImage();
                    }, []);
        //   For Image post
        const [selectedFile, setSelectedFile] = useState();
        const [isFilePicked, setIsFilePicked] = useState(false);
        const [isSelected, setisSelected] = useState(false);
    
        const changeHandler = (event) => {
            setSelectedFile(event.target.files);
            setisSelected(true);
            setconfimation(null)
            var file = event.target.files[0];
            document.getElementById("pro-pic").src = URL.createObjectURL(file);
            const formData = new FormData();
            if(file){
            formData.append('userProfile', file);
            
            // const headers = {
            //     'Content-Type': 'Application/Json',
            //     'Accept': 'Application/Json'
            //     }
    
            fetch(
                process.env.REACT_APP_SPENDISTRY_API+`user/uploadImage/${emails}`,
                {
                    method: 'POST',
                    body: formData,
                    // headers,
                }
            )
                // .then((response) => response.json())
                .then((result) => {
                    console.log('Success:', result);
                    //bring back p tag with id confirmation
            
                    // document.getElementById("confirmation").show();
                    setSnackbarMessage("Profile Picture Updated")
                    setSnackbarOpen(true);
                })
                .catch((error) => {
                    console.error('Error:>>>>>', error,selectedFile );
                    //show p tag with id confirmation
                   setSnackbarMessage("Something went wrong!")
                    setSnackbarOpen(true);
                });
            }
        };
    
        const handleSubmission = () => {
            
        };

            // const refreshPage = setTimeout(() => {
            // window.location.reload(false);
            // }, 1000);

          
    return (
        <Fragment >
 <SnackBar
      anchorOrigin={{vertical: 'bottom', horizontal: "center"}}
      open={snackbarOpen}
      autoHideDuration={2000}
      message={snackbarMessage}
      onClose={() => setSnackbarOpen(false)}>
     <SnackbarContent
      style={{backgroundColor: '#005EFC'}}
      message={snackbarMessage}/> 
      </SnackBar>
            {/* <div style={{overflowY:"scroll" ,overflowX:"auto", height:height-150}} > */}
       <div className="App">
        <div className="outer" >
        <div className="inner">
             <h3>Edit Profile</h3>
            <div id="edit-profile-pic" style={{boxSizing:"border-box"}}>
            <img src={img} alt="Image" className="image" id="pro-pic" width="70" height="70"/>
            <div id="edit-profile-input-field">
        <input type="file"  name="userProfile" onChange={changeHandler} accept="image/*" id="file-pic"/>
        </div>
            </div>
            
        <div className="form-group">
        {/* <p id="confirmation">{confimation}</p> */}
                

        <div id="edit-profile-submit-field"> 
        
				{/* <button onClick={() => { handleSubmission();}} id="edit-submit-btn">Submit</button> */}
			</div>
            </div>
        <form onSubmit={handleSubmit} >
           
            
            <div className="form-group">
                <label>Email</label>
                <input disabled value={emails} type="email" id="email" className="form-control"
                placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label>First name</label>
                <input value={fname} type="text" id="fname" className="form-control"
                onChange={(e) => {setfname(e.target.value)}}
                placeholder="First name" />
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input value={lname} type="text" id="lname" className="form-control"
                onChange={(e) => {setlname(e.target.value)}}
                placeholder="Last name" />
            </div>

           

            <div className="form-group">
                <label>Mobile Number</label>
                <input value={mobileNumber} type="tel" id="mobileNumber" className="form-control"
                onChange={(e) => {setmobileNumber(e.target.value)}}
                placeholder="Mobile Number" />
            </div>
            
            <div className="form-group">
                <label>Address</label>
                <input value={address} type="text" id="address" className="form-control"
                onChange={(e) => {setaddress(e.target.value)}}
                placeholder="Address" />
            </div>


            <button type="submit" id="Sign-btn" className="btn btn-dark btn-lg btn-block">Save</button>
            {/* <p className="forgot-password text-right">
                Already registered? <Link to={"/sign-in"}> <span id="Account-Sign-up"> log in! </span></Link>
            </p> */}
        </form>
        </div>
        </div>
        </div>
            {/* </div> */}
    

        

        </Fragment>
    );
} 
export default EditProfile;
