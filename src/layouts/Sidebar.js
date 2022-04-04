import { useState} from 'react'
import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation, Navigate } from "react-router-dom";
import "./sidebar.css"

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "bi bi-speedometer2",
  },
  {
    title: "All Invoices",
    href: "/AllInvoices",
    icon: "bi bi-columns",
  },
  {
    title: "Reported Invoices",
    href: "/Reported",
    icon: "bi bi-card-text",
  },
  {
    title: "Returned Invoices",
    href: "/Returned",
    icon: "bi bi-layout-split",
  },
 
  {
    title: "Edit Profile",
    href: "/Edit",
    icon: "bi bi-people",
  },
  // {
  //   title: "Logout",
  //   href: "/Logout",
  //   icon: "bi bi-bell",
  // },
];


const Sidebar = () => {
  const [reload, setReload] = useState(false)
  const [logo, setLogo] = useState(false);

  const Logout = () => {
    
    window.location.href = "/";

if (localStorage.getItem('email') !== null || localStorage.getItem('Jwt') !== null ) {
        localStorage.removeItem("Jwt");
        localStorage.removeItem("email");
        // localStorage.setItem("email", null);
      } else {
        sessionStorage.clear();
      
      }
  }
  
  let location = useLocation();

  const [show, setShow] = useState(true)
  const showMobilemenu = () => {
    setShow(!show);
  };

  const remove = (e) => {
    e.preventDefault();
    // console.log("e",e.target.innerHTML)
    sessionStorage.removeItem("id")
    // console.log(navigation[1].title)
    if(e.target.innerHTML.match(navigation[1].title)){
      
      if(sessionStorage.getItem('id')){
        
        setReload(true)
      }
    
      
    // console.log("inside if")
    } else {
      setReload(false)
    }

  }

  const handleLogo = () => {
      setLogo(true);
  }

  if(logo){
    // return(
      window.location.href = "/dashboard"
    // )
  }

  if(reload){
    // console.log("reload")
      window.location.reload()
  }

  return (
    <div style={{background:"#005EFC", borderRadius:"25px"}} >
      <div className="menuButton">
        <Button
          color="red"
          className="ms-auto text-white"
          onClick={() => showMobilemenu()}
        >       
          <i className="bi bi-menu-down"></i>
        </Button>
      </div>

      {show === true ? 
      
      <div className="p-3 mt-2" >
        <div>
          {/* <p style={{fontSize: '21px', textAlign: "center", paddingTop: '30px'}}> <span style={{color: "orange"}}>Spe</span><span style={{color: "white"}}>ndi</span><span style={{color: "#006400"}}>stry</span></p> */}
          <img src='https://i.ibb.co/RjFjbb9/spendistry-Web.png' alt="logo" style={{width: '100%', height: '100%', cursor:"pointer"}} onClick={handleLogo} />
        </div>
        <br/>
        <><Nav vertical className="sidebarNav" >
            {navigation.map((navi, index) => (
              <NavItem key={index} className="sidenav-bg" onClick={remove}>
                <Link
                  to={navi.href}
                  className={location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link py-3"}
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block" >{navi.title}</span>
                </Link>
              </NavItem>
            ))}

          </Nav><p id="logout-btn" className="logoutbtn" style={{borderRadius:"8px",color: '#badafa', paddingTop: '3%', cursor: "pointer" }} onClick={Logout}><i className="bi bi-door-closed"></i><span className="ms-3 d-inline-block">Logout</span></p></>    
        </div>
        : "" }
      </div>
  
  );
};

export default Sidebar;
