import logo from './logo.svg';
// import './App.css';
import Navbar from './components/Navbar';
import Signup from './components/Signup'
import Login from './components/Login'
import { Stack } from '@mui/system';
import { GlobalContext } from './context/Context';
import { useState, useContext, useEffect } from 'react';
import { Box, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import axios from 'axios';
import { Routes, Route, Link, Navigate } from "react-router-dom";
let baseUrl = ""
if (window.location.href.split(":")[0] === "http") {
  baseUrl = "http://localhost:5001"
}
function App() {
  let { state, dispatch } = useContext(GlobalContext);

  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      let baseUrl = "";
      try {
        let response = await axios.get(`${baseUrl}/api/v1/products`, {
          withCredentials: true
        })
        dispatch({
          type: 'USER_LOGIN'
        })
      }
      catch {
        dispatch({
          type: 'USER_LOGOUT'
        })

      }
    }
    getProduct();
  }, [])

  return (

    <Stack>
      {
        (state.isLogin) ?
          null
          :
          <ul className='navBar'>
            <li> <Link to={`/`}>Login</Link> </li>
            <li> <Link to={`/signup`}>Signup</Link> </li>
          </ul>
      }


      {(state.isLogin) ?

        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        :
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      }

      {
        (state.isLogin === null) ?
          <div>Splash</div> :
          null
      }
    </Stack>

  );
}

export default App;