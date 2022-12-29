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
import Splash from './components/Splash';
let baseUrl = ""
if (window.location.href.split(":")[0] === "http") {
  baseUrl = "http://localhost:5001"
}
function App() {
  let { state, dispatch } = useContext(GlobalContext);

  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const getProduct = async () => {
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

      {(state.isLogin === true) ?

        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        :
        null
      }
      {(state.isLogin === false) ?
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        :
        null
      }

      {
        (state.isLogin === null) ?
          <Splash />
          : null
      }
    </Stack>

  );
}

export default App;