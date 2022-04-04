import { useEffect, useState} from 'react'
import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation, Navigate } from "react-router-dom";
import "./sidebar.css"
// import 'bootstrap/dist/css/bootstrap.min.css'; //toggle logo


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
    icon: "bi bi-exclamation-octagon-fill",
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
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
        if(window.innerWidth < 768){
          setCollapsed(false);
        } else{
          setCollapsed(true);
        }
  },[]);

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

  const handleLogo = (e) => {
    e.preventDefault();
      setLogo(true);
  }

  if(logo){
    window.location.href = "#/dashboard"
      setLogo(false)
    
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
          <i class="bi bi-menu-button-wide"></i>
        </Button>
      </div>

      {show === collapsed ? 
      
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

          </Nav><p id="logout-btn" className="logoutbtn" style={{borderRadius:"8px",color: '#badafa', paddingTop: '3%', cursor: "pointer" }} onClick={Logout}><i className="bi bi-arrow-bar-left"></i><span className="ms-3 d-inline-block">Logout</span></p></>    
        </div>
        : 
        <div>
          {/* <p style={{fontSize: '21px', textAlign: "center", paddingTop: '30px'}}> <span style={{color: "orange"}}>Spe</span><span style={{color: "white"}}>ndi</span><span style={{color: "#006400"}}>stry</span></p> */}
          <img src='https://i.ibb.co/RjFjbb9/spendistry-Web.png' alt="logo" style={{width: '100%', height: '100%', cursor:"pointer", paddingBottom:"10px"}} onClick={handleLogo} />
        </div>
        }
      </div>
  
  );
};

export default Sidebar;
