import React, { Component, Fragment, useState  } from "react";
import Global from "./global.js";
import axios from "axios";
import "./login.index.css";
import { Link , Navigate } from 'react-router-dom';


const Forgot = (props) => {
console.log('>>>',props.email)

const [password, setPassword] = useState('');
const [message, setMessage] = useState('');
const handlenewpassword = () => {
   const data = {
    password:password
   };
 axios
   .patch(`https://cdbd-18-212-22-122.ngrok.io/auth/b4xabhishek@gmail.com`, data)
   .then(res => console.log(res))
   .then(() => setMessage('PASSWORD CHANGED! success'))
   .catch(err => 
    ({err: " Try Again -"+err.message}))
}

return (
        <Fragment>
   
   <div className="App">

<div className="outer">
<div className="inner">


        <form onSubmit={handlenewpassword}>

            <h3>Change your Password</h3>

            <div className="form-group">
                <label for="email">New Password</label>
                <input type="password" className="form-control"  
                placeholder="Enter new Password" 
                onChange={(e)=>setPassword(e.target.value)}
                required/>
            </div>
            <p id=" " style={{color: "red"}} >{props.email} - Email</p>
            <button type="submit" className="btn btn-dark btn-lg btn-block" id=" ">Submit</button>
            <p className="forgot-password text-center">
                <a><Link to={"/"}> <h2>{message} </h2>GO TO LOGIN PAGE {password} </Link></a>
                
            </p> 
        </form>
        </div>
</div>
</div>
        </Fragment>
    );
}
export default Forgot;
