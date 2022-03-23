import React, { Component, Fragment, useState, useEffect  } from "react";
import Global from "./global.js";
import axios from "axios";
import "./login.index.css";
import { Link , Navigate } from 'react-router-dom';
import ChangePass from "./ChangePass"

class Forgot extends Component {

    state = {
        email: "",
        err: null,
        show:false, 
        otp: "", 
        redirect:false
      };
      onemailChange = e => {
        this.setState({
          email: e.target.value
        });
      };
    
      onotpChange = e => {
        this.setState({
          otp: e.target.value
        });
      };

      handleSubmit = e => {
        e.preventDefault();
        const data = {
          email: this.state.email,
        };
        axios
          .post("https://cdbd-18-212-22-122.ngrok.io/otp/forgotpassword", data)
          // .then(res => console.log(res))
          .then(res => this.setState({err: res.data})) 
          .then(() => this.setState({show: true}))
          .catch(err => 
            this.setState({err: " Invalid Email -"+err.message}))
      };

      handleotpSubmit = e => {
        e.preventDefault();
        const data = {
          email: this.state.email,
          otp: this.state.otp,
        };
        axios
          .post("https://cdbd-18-212-22-122.ngrok.io/otp/verifyOtp", data)
          .then(res => console.log(res))
          .then(res => this.setState({otp: res})) 
          .then(() => this.setState({redirect: true})) 
          .catch(err => 
            this.setState({err: " Invalid OTP -"+err.message}))
      };

      handlenewpasswordSubmit = e => {
        e.preventDefault();
        const data = {
          email: this.state.email,
          password: this.state.password,
        };
        axios
          .post(`https://cdbd-18-212-22-122.ngrok.io/auth/${this.state.email}`, data)
          .then(res => console.log(res))
          .then(res => this.setState({otp: res})) 
          .then(() => this.setState({redirect: true})) 
          .catch(err => 
            this.setState({err: " Invalid OTP -"+err.message}))
      };


      render() {
        const { err,show, otp, email, redirect } = this.state;
    return (
        <Fragment>
   
   <div className="App">

<div className="outer">
<div className="inner">
       
        <form onSubmit={this.handleSubmit}>
            <h3>Forgot Password?</h3>
            <div className="form-group">
                <label for="email">Email</label>
                <input type="email" name=" " 
                className="form-control" value={this.state.email}
                onChange={this.onemailChange} placeholder="Enter email" 
                required/>
            </div>
            <p style={{color: "red"}} >
              {err}
            </p>
            <button type="submit" className="btn btn-dark btn-lg btn-block">Send OTP</button>
            <p className="forgot-password text-right">
                <a><Link to={"/"}>Back to Log in!</Link></a>
            </p>
            </form>

            {show === true ? 

               <form onSubmit={this.handleotpSubmit}>   
               <div className="form-group">
                   <label for="otp">OTP</label>
                   <input type="otp" name=" " 
                   className="form-control" value={this.state.otp}
                   onChange={this.onotpChange} placeholder="Enter otp" 
                   required/>
               </div>
               <button type="submit" className="btn btn-dark btn-lg btn-block">Submit OTP</button>
               { 
               this.state.redirect === true ?  
               <>
               <p className="forgot-password text-center">
               <p>OTP verified -change your password!</p>
               </p>
                </> :
                '' 
                }
               </form>
              :''}
        </div>
</div>
{ show === true && redirect === true? 
<div>
<ChangePass email={email} />
</div> : ''
      }
</div>
        </Fragment>
    );
}
}
export default Forgot;
