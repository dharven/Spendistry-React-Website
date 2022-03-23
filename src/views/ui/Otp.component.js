import React, { Component, Fragment, useState, useEffect  } from "react";
import Global from "./global.js";
import axios from "axios";
import "./login.index.css";
import { Link , Navigate } from 'react-router-dom';


const Otp = () => {
    const [message, setMessage] = useState('')

    const [formValue, setformValue] = React.useState({
        otp: ''
      });
    
        const handleSubmit = async() => {
            // store the states in the form data
            const loginFormData = new FormData();
            loginFormData.append("username", formValue.otp)
          
            try {
              // make axios post request
              const response = await axios({
                method: "post",
                url: "https://cdbd-18-212-22-122.ngrok.io/otp/verifyOtp",
                data: loginFormData,
                headers: { "Content-Type": "multipart/form-data" },
              });
              console.log(response);
              alert("OTP VERIFIED")
            } catch(error) {
              alert('Invalid OTP')
            }
          }
    
      const handleChange = (event) => {
        setformValue({
          ...formValue,
          [event.target.name]: event.target.value
        });
      }
    

    return (
        <Fragment>
   
                <div className="App">

                <div className="outer">
                <div className="inner">
                <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label for="OTP">Enter OTP</label>
<input
        type="number"
        name="otp"
        placeholder="enter OTP"
        value={formValue.email}
        onChange={handleChange}
      />        
      </div>
            <p id=" " style={{color: "red"}}>{message}</p>
            <button type="submit" className="btn btn-dark btn-lg btn-block" id=" ">Submit</button>
            <p className="forgot-password text-right">
                <a><Link to={"/"}>Back to Log in!</Link></a>
            </p>
           
        </form>
        </div>
</div>
</div>
        </Fragment>
    );
}
export default Otp;
