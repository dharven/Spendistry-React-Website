import React, { Component, Fragment, useState  } from "react";
import Global from "./global.js";
import axios from "axios";
import "./login.index.css";
import { Link , Navigate } from 'react-router-dom';


const LogIn = () => {
    const [loggedIn, setLoggedIn] = React.useState(false);
    
    React.useEffect(() => {
        //get data from url with axios

        
    },[])
    

    const submit = (e) => {
        e.preventDefault();
         const {email, password} = e.target.elements;
    // console.log(email.value)
        axios.post(
            "https://cdbd-18-212-22-122.ngrok.io/auth/userLogin",
{
                _id: email.value, 
                password: password.value
              })
          .then((response) => {
            console.log(response.data.message)
            if(response.data.message=="Cannot find user email" || response.data.message=="Invalid Password")
            {
                document.getElementById("password-error").innerHTML='Invalid Email or password'
            
            }
            // else if(response.data.message=="Invalid Password")
            // {
            //     document.getElementById("password-error").innerHTML='Invalid Email or Password'
            // }
           
            else{
            if (document.getElementById("customCheck1").checked){
                localStorage.setItem (
                    "Jwt", response.data
                )
                localStorage.setItem ("email", email.value )
            }
            else {sessionStorage.setItem ("Jwt", response.data)
            sessionStorage.setItem ("email",email.value )
            localStorage.setItem ("email", email.value )
        }
        setLoggedIn(true);
    }

          

          })
          
        
      
         
          .catch((error) => {
            console.log(error);
          })
    }

    if(loggedIn){
        return(
            <Navigate to="/dashboard"/>
        )
    }



    return (
        <Fragment>
   
   <div className="App">

<div className="outer">
<div className="inner">
        <form onSubmit= {submit}>

            <h3>Log in</h3>

            <div className="form-group">
                <label for="email">Email</label>
                <input type="email" id="_id" name="email" className="form-control"  placeholder="Enter email" required/>
            </div>
            <p id="email-error" style={{color: "red"}} ></p>
            <div className="form-group">
                <label for="password" >Password</label>
                <input type="password" id="password" name="password" className="form-control" placeholder="Enter password" required/>
            </div>
                <p id="password-error" style={{color: "red"}}></p>
            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block" id="Sign-btn">Log in</button>
            <p className="forgot-password text-right">
                <a><Link to={"/Forgot"}> Forgot password?</Link></a>
            </p>
            <p id="Account-Sign">
                Don't have an account? <Link to={"/sign-up"}><span id="Account-Sign-up">Sign Up</span> </Link>
            </p>
        </form>
        </div>
</div>
</div>
        </Fragment>
    );
}
export default LogIn;
