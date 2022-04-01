import React, { Component, Fragment, useState  } from "react";
import axios from "axios";
import "./login.index.css";
import { Link , Navigate } from 'react-router-dom';


const LogIn = () => {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [login, setLogin] = React.useState(false);
    
    React.useEffect(() => {
        if (localStorage.getItem('Jwt') !== null || sessionStorage.getItem('Jwt') !== null) {
            setLogin(true);
        }
        if(localStorage.getItem('check') == "true"){
            document.getElementById("customCheck1").checked = true;
        } else {
            document.getElementById("customCheck1").checked = false;
        }
        
    },[])

    

    const submit = (e) => {
        e.preventDefault();
         const {email, password} = e.target.elements;
        axios.post(
            process.env.REACT_APP_SPENDISTRY_API+"auth/userLogin",
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

           
            else{
            if (document.getElementById("customCheck1").checked){
                localStorage.setItem (
                    "Jwt", response.data
                )
                localStorage.setItem ("email", email.value )
                localStorage.setItem ("check", true )
            }
            else {sessionStorage.setItem ("Jwt", response.data)
            sessionStorage.setItem ("email",email.value )
            localStorage.setItem ("check", false )
            
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
