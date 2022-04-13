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
   .patch( process.env.REACT_APP_SPENDISTRY_API+`auth/`+props.email, data)
   .then(res => console.log(res))
   .then(() => {setMessage('PASSWORD CHANGED!')
setGoToLogin(true)
})
   .catch(err => 
    ({err: " Try Again -"+err.message}))
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
                                <i class="bi bi-eye-fill" id="eye" style={{cursor: "pointer", float: "right", marginTop: "-30px", marginRight: "10px"}} onClick={hidePwd} ></i>
                <i class="bi bi-eye-slash-fill" id="eye-slash" style={{cursor: "pointer", float: "right", marginTop: "-30px", marginRight: "10px"}} onClick={seePwd} ></i>

            </div>
            <p id=" " style={{color: "red"}} >Email: {props.email} </p>
            <button type="submit"  className="btn btn-dark btn-lg btn-block" id="Sign-btn">Submit</button>
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
