import React from "react";
import { Navbar } from "reactstrap";



const Header = () => {
  
  const Logout = () => {
    
    window.location.href = "/";

if (localStorage.getItem('email') !== null || localStorage.getItem('jwt') !== null ) {
        localStorage.removeItem('email')
          localStorage.removeItem('jwt')
      } else {
        sessionStorage.removeItem('email');
       sessionStorage.removeItem('jwt');
      }
  }
  

  
  return (
    <Navbar color="white" light expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          <p style={{fontSize: '21px', textAlign: "center", paddingTop: '10px', paddingLeft: '10%'}}> <span style={{color: "orange"}}>Spe</span><span style={{color: "grey"}}>nd</span><span style={{color: "green"}}>istry</span></p>
        </div>
       <button onClick={Logout}>Logout</button>  
      </div>
      
    
    </Navbar>
  );
};

export default Header;
