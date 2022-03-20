import React from "react";
import { Navbar } from "reactstrap";



const Header = () => {
  
  return (
    <Navbar color="white" light expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          <p style={{fontSize: '21px', textAlign: "center", paddingTop: '10px', paddingLeft: '10%'}}> <span style={{color: "orange"}}>Spe</span><span style={{color: "grey"}}>nd</span><span style={{color: "green"}}>istry</span></p>
        </div>
        
      </div>
      
    
    </Navbar>
  );
};

export default Header;
