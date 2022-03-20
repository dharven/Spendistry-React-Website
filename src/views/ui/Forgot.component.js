import React, { Component, Fragment, useState  } from "react";
import Global from "./global.js";
import axios from "axios";
import "./login.index.css";
import { Link , Navigate } from 'react-router-dom';




const Forgot = () => {

    return (
        <Fragment>
   
   <div className="App">

<div className="outer">
<div className="inner">
        <form>

            <h3>Forgot Password?</h3>

            <div className="form-group">
                <label for="email">Email</label>
                <input type="email" id=" " name=" " className="form-control"  placeholder="Enter email" required/>
            </div>
            <p id=" " style={{color: "red"}} ></p>
           

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
export default Forgot;
