import React, { Component, Fragment, useState  } from "react";
import Global from "./global.js";
import axios from "axios";
import "./login.index.css";
import { Link , Navigate } from 'react-router-dom';


const Forgot = (props) => {
console.log('>>>',props.email)

const [password, setPassword] = useState('');
const [message, setMessage] = useState('');
const [goToLogin, setGoToLogin] = useState(false);
const handlenewpassword = (e) => {
e.preventDefault();
   const data = {
    password:document.getElementById('password').value,
   };
 axios
   .patch(`https://cdbd-18-212-22-122.ngrok.io/auth/b4xabhishek@gmail.com`, data)
   .then(res => console.log(res))
   .then(() => {setMessage('PASSWORD CHANGED!')
setGoToLogin(true)
})
   .catch(err => 
    ({err: " Try Again -"+err.message}))
}

if(goToLogin){
    return <Navigate to="/"/>
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
                id="password"
                required/>
            </div>
            <p id=" " style={{color: "red"}} >{props.email} - Email</p>
            <button type="submit"  className="btn btn-dark btn-lg btn-block" id=" ">Submit</button>
            <p className="forgot-password text-center">
                <a><Link to={"/"}> <h2>{message} </h2>GO TO LOGIN PAGE </Link></a>
                
            </p> 
        </form>
        </div>
</div>
</div>
        </Fragment>
    );
}
export default Forgot;
