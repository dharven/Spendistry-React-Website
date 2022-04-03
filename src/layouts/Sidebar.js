import { useState} from 'react'
import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
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
    
    // console.log(navigation[1].title)
    if(e.target.innerHTML.match(navigation[1].title)){
      
      if(sessionStorage.getItem('id')){
        sessionStorage.removeItem("id")
        setReload(true)
      }
    
      
    // console.log("inside if")
    } else {
      setReload(false)
    }

  }

  if(reload){
    // console.log("reload")
      window.location.reload()
  }

  return (
    <div style={{background:"#03045E", borderRadius:"25px"}} >
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
          <p style={{fontSize: '21px', textAlign: "center", paddingTop: '10px'}}> <span style={{color: "orange"}}>Spe</span><span style={{color: "white"}}>ndi</span><span style={{color: "green"}}>stry</span></p>
        </div>
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

          </Nav><p id="logout-btn" className="logoutbtn" style={{ color: 'red', paddingTop: '3%', cursor: "pointer" }} onClick={Logout}><i className="bi bi-door-closed"></i><span className="ms-3 d-inline-block">Logout</span></p></>    
        </div>
        : "" }
      </div>
  
  );
};

export default Sidebar;
