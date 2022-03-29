import React, { Component, Fragment } from "react";
import axios from "axios";

import "./login.index.css";
import { Link , Navigate } from 'react-router-dom';

const SignIn = () => {
    const [registered, setregistered] = React.useState(false);
    const [login, setLogin] = React.useState(false);

    React.useEffect(() => {
        //get data from url with axios
        if (localStorage.getItem('Jwt') !== null || sessionStorage.getItem('Jwt') !== null) {
            setLogin(true);
        }

        
    },[])
    const submit = (e) =>{
        e.preventDefault();
        axios.post("https://cdbd-18-212-22-122.ngrok.io/auth",{
            _id: document.getElementById("email").value, 
            password: document.getElementById("password").value
        }).then((response)=>{
            axios.post(
                "https://cdbd-18-212-22-122.ngrok.io/user",
                    {
                    "_id": document.getElementById("email").value,
                    "fname": document.getElementById("fname").value,
                    "lname": document.getElementById("lname").value,
                    "email": document.getElementById("email").value,
                    "mobileNumber": document.getElementById("mobileNumber").value,
                    "address": document.getElementById("address").value,

                  })
              .then((respose) => {
                  
                  axios.post("https://cdbd-18-212-22-122.ngrok.io/invoice",
                  {
                  _id: document.getElementById("email").value
                })
                console.log(respose);
                setregistered(true)
              })
              .catch((error) => {
                console.log(error);
              })
              
        }).catch((error)=>{
            document.getElementById("emailError").innerText = "Email already exists"
        })
    }
    if(registered){
        return(
            <Navigate to="/"/>
        )
    }

    if(login){
        return(
        <Navigate to="/dashboard"/>
        )
    }

    return (
        <Fragment>
       <div className="App">

<div className="outer">
<div className="inner">
        <form onSubmit={submit}>
            <h3>Register</h3>

            <div className="form-group">
                <label>First name</label>
                <input type="text" id="fname" className="form-control" placeholder="First name" required/>
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input type="text" id="lname" className="form-control" placeholder="Last name" required/>
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email" id="email" className="form-control" placeholder="Enter email" required/>
            </div>

            <p id="emailError" style={{color: 'red'}}></p>

            <div className="form-group">
                <label>Password</label>
                <input type="password" id="password" className="form-control" placeholder="Enter password" required/>
            </div>

            <div className="form-group">
                <label>Mobile Number</label>
                <input type="tel" id="mobileNumber" className="form-control" placeholder="Mobile Number" required/>
            </div>
            
            <div className="form-group">
                <label>Address</label>
                <input type="text" id="address" className="form-control" placeholder="Address" required/>
            </div>


            <button type="submit" id="Sign-btn" className="btn btn-dark btn-lg btn-block">Register</button>
            <p className="forgot-password text-right">
                Already registered? <Link to={"/sign-in"}> <span id="Account-Sign-up"> log in! </span></Link>
            </p>
        </form>
        </div>
        </div>
        </div>
        </Fragment>
    );
} 
export default SignIn;
