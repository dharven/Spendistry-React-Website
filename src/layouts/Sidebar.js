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
    title: "Statistics",
    href: "/Statistics",
    icon: "bi bi-columns",
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
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="bg-dark">
      
      <div className="d-flex">
        <Button
          color="red"
          className="ms-auto text-white d-lg-none"
          onClick={() => showMobilemenu()}
        >
          
          <i className="bi bi-x"></i>
        </Button>
      </div>
      
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
         
        </Nav>
        <p id="logout-btn" style={{color: 'red', paddingLeft: '6.5%', paddingTop: '3%', cursor: "pointer"}} onClick={Logout}><i className="bi bi-door-closed"></i><span className="ms-3 d-inline-block">Logout</span></p>
      </div>
      </div>
  
  );
};

export default Sidebar;
