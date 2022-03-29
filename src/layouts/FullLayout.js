import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import React, {useState,useEffect} from 'react'
import axios from 'axios';

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
   <div>
      {/********header**********/}

      {(() => {
        if (!loggedInVerify) {
          return (
            <main>
            <Header />
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <div className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </div>
        {/********Content Area**********/}
        <div className="contentArea">
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
            <div>
              <h1>loading</h1>
            </div>
          )
        }
      })()}
      </div>
  );
};

export default FullLayout;
