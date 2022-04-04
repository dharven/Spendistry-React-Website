import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { Spinner } from "reactstrap";
import "./loader/loader.scss";



// export const AuthContext = React.createContext();
const FullLayout = () => {


  const[loggedInVerify, setLoggedInVerify] = useState(true);
  const[login, setLogin] = useState(false);

  useEffect(() => {

    const verify = async () => {
      if (localStorage.getItem('Jwt') !== null ) {
        var jwt = localStorage.getItem('Jwt')
      } else {
        var jwt = sessionStorage.getItem('Jwt')
      }
      axios.post('https://cdbd-18-212-22-122.ngrok.io/loggedInVerify',{} ,{
        headers: {
          'auth-token':  jwt    
        }
      }).then((response) => {
        console.log(response.data);
        if(response.data == "User Verified"){
        setLoggedInVerify(false);
        } else {
        setLoggedInVerify(true);
        setLogin(true);
        }
      }).catch((error) => {
       localStorage.clear();
        sessionStorage.clear();
        console.log(error.message);
        console.log(error.response.data);
        setLoggedInVerify(true);
        setLogin(true);
  
      })
    }

    verify();
  }, []);

  if(login){

    window.location = "/";
  }




  return (
   <div >
      {/********header**********/}

      {(() => {
        if (!loggedInVerify) {
          return (
            <main>
            {/* <Header /> */}
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <div className="sidebarArea shadow" id="sidebarArea"  style={{background:"#005EFC"}}>
          <Sidebar />
        </div>
        {/********Content Area**********/}
        <div className="contentArea" style={{height:"100vh"}}>
          {/********Middle Content**********/}
          <Container className="p-4" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
      </main>

            
          )
        } else {
          return (
            <div className="fallback-spinner">
            <div className="loading">
              <Spinner color="primary" />
            </div>
          </div>
          )
        }
      })()}
      </div>
  );
};

export default FullLayout;
