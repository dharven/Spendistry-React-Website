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
        err1: null,
        show:false, 
        otp: "", 
        redirect:false,
        login:false
      };
      onemailChange = e => {
        this.setState({
          email: e.target.value
        });
      };

      componentDidMount() {
        
        if (localStorage.getItem('Jwt') !== null || sessionStorage.getItem('Jwt') !== null) {
          this.setState({login: true});
      }
    }

    
    
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
          .then(() => {this.setState({show: true})
            document.getElementById("email").disabled = true})
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
          .then(() => {this.setState({redirect: true, err1:null})
        }) 
          .catch(err => 
            this.setState({err1: " Invalid OTP -"+err.message}))
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
            this.setState({err1: " Invalid OTP -"+err.message}))
      };

      handleEdit = () => {
        this.setState({show: false});
        document.getElementById("email").disabled = false;
      };

      handleResend = () => {
        if(this.state.email !== ""){
        const data = {
          email: this.state.email,
        };
        axios
          .post("https://cdbd-18-212-22-122.ngrok.io/otp/forgotpassword", data)
          .then(res => this.setState({err: res.data}))
          .then(() => this.setState({show: true}))
          .catch(err =>
            this.setState({err: " Invalid Email -"+err.message}))
      }
    };


    


      render() {
        const { err, err1,show, otp, email, redirect , login } = this.state;
    return (
        <Fragment>

          {/*
          write if condition to check if user is logged in or not
           */}
          {login ? <Navigate to="/dashboard"/> : null}
   
   <div className="App">

<div className="outer">
<div className="inner">
       
        <form onSubmit={this.handleSubmit}>
            <h3>Forgot Password?</h3>
            <div className="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" 
                className="form-control" value={this.state.email}
                onChange={this.onemailChange} placeholder="Enter email" 
                required/>
            </div>
            <p style={{color: "red"}} >
              {err}
            </p>
            <a><Link to={"/Forgot"} onClick={this.handleEdit} id="edit-email-forgot-password">Edit Email</Link></a>
            <button type="submit" className="btn btn-dark btn-lg btn-block" id="Sign-btn">Send OTP</button>
            
            <a><Link to={"/Forgot"} onClick={this.handleResend} id="resend-otp">Resend OTP</Link></a>
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
                <p style={{color: "red"}} >{err1}</p>
               <button type="submit" className="btn btn-dark btn-lg btn-block" id="Sign-btn">Submit OTP</button>
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
