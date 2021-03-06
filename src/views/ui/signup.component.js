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
        axios.post( process.env.REACT_APP_SPENDISTRY_API+"auth",{
            _id: document.getElementById("email").value, 
            password: document.getElementById("password").value
        }).then((response)=>{
            axios.post(
                process.env.REACT_APP_SPENDISTRY_API+"user",
                    {
                    "_id": document.getElementById("email").value,
                    "fname": document.getElementById("fname").value,
                    "lname": document.getElementById("lname").value,
                    "email": document.getElementById("email").value,
                    "mobileNumber": document.getElementById("mobileNumber").value,
                    "address": document.getElementById("address").value,

                  })
              .then((respose) => {
                  
                  axios.post( process.env.REACT_APP_SPENDISTRY_API+"invoice",
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

    const rmvErr = () =>{
        document.getElementById("emailError").innerText = ""
    }

    const seePwd = () => {
        const pwd = document.getElementById("password");
       const z = document.getElementById("eye-slash");
        const y = document.getElementById("eye");
        pwd.type = "text";
        y.style.display = "block";
        z.style.display = "none";
    }

    const hidePwd = () => {
        const pwd = document.getElementById("password");
        const z = document.getElementById("eye-slash");
        const y = document.getElementById("eye");
        pwd.type = "password";
        y.style.display = "none";
        z.style.display = "block";
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
                <input type="email" id="email" className="form-control" placeholder="Enter email" onChange={rmvErr} required/>
            </div>

            <p id="emailError" style={{color: 'red'}}></p>

            <div className="form-group">
                <label>Password</label>
                <input type="password" id="password" className="form-control" placeholder="Enter password" required/>
                <i class="bi bi-eye-fill" id="eye" style={{cursor: "pointer", float: "right", marginTop: "-30px", marginRight: "10px"}} onClick={hidePwd} ></i>
                <i class="bi bi-eye-slash-fill" id="eye-slash" style={{cursor: "pointer", float: "right", marginTop: "-30px", marginRight: "10px"}} onClick={seePwd} ></i>
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
