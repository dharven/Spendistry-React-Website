import React, { Component, Fragment, useState, useEffect } from "react";
import axios from "axios";

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
    
    useEffect(() => {
        if (localStorage.getItem('email') !== null ) {
            var email = localStorage.getItem('email')
          } else {
            var email = sessionStorage.getItem('email')
          }

        const handlegetdata = async () => {
            const { data} = await axios.get("https://cdbd-18-212-22-122.ngrok.io/user/"+email)
            setfname(data.fname)
            setlname(data.lname)
            setemails(email)
            setmobileNumber(data.mobileNumber)
            setaddress(data.address)
            console.log(data, data.fname, "https://cdbd-18-212-22-122.ngrok.io/user/"+email)
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
            const { data} = await axios.patch(`https://cdbd-18-212-22-122.ngrok.io/user/${emails}`, patchdata)
            console.log(patchdata)
            alert("Profile Edited Successfully")
          }

          // for image get 
          const [img, setImg] = useState();
                    useEffect(() => {
                        if (localStorage.getItem('email') !== null ) {
                            var email = localStorage.getItem('email')
                          } else {
                            var email = sessionStorage.getItem('email')
                          }
                        const fetchImage = async () => {
                            const res = await fetch(`https://cdbd-18-212-22-122.ngrok.io/userProfile/${email}.jpeg`);
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
            document.getElementById("pro-pic").src = URL.createObjectURL(event.target.files[0]);
        };
    
        const handleSubmission = () => {
            const formData = new FormData();
            if(selectedFile){
            formData.append('userProfile', selectedFile[0]);
            
            // const headers = {
            //     'Content-Type': 'Application/Json',
            //     'Accept': 'Application/Json'
            //     }
    
            fetch(
                `https://cdbd-18-212-22-122.ngrok.io/user/uploadImage/${emails}`,
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
                    setconfimation("Image Uploaded!!")
                })
                .catch((error) => {
                    console.error('Error:>>>>>', error,selectedFile );
                    //show p tag with id confirmation
                    setconfimation("Error in uploading of image!!")
                });
            } else {
                setconfimation("select the file first!!")
            }
        };

            // const refreshPage = setTimeout(() => {
            // window.location.reload(false);
            // }, 1000);

          
    return (
        <Fragment>
       <div className="App">
        <div className="outer">
        <div className="inner">
            {/* image */}
       
			{/* {isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)} */}
			
{/* Form */}
        {/* <div className="form-group">
         <label>Password</label>
                <Link to ="/Forgot"> <button>Change Password</button></Link>
            </div> */}
             <h3>Edit Profile</h3>
            <div id="edit-profile-pic">
            <img src={img} alt="Image" className="image" id="pro-pic" width="50" height="50"/>
            <p id="confirmation">{confimation}</p>
            </div>
            <div id="edit-profile-input-field">
        <input type="file"  name="userProfile" onChange={changeHandler} accept="image/*" id="file-pic"/>
        </div>
        <div className="form-group">
                

        <div id="edit-profile-submit-field"> 
        
				<button onClick={() => { handleSubmission();}} id="edit-submit-btn">Submit</button>
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
        </Fragment>
    );
} 
export default EditProfile;
