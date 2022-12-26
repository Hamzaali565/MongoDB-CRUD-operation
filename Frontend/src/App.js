import logo from './logo.svg';
// import './App.css';
import Navbar from './components/Navbar';
import Signup from './components/Signup'
import Login from './components/Login'
import { Stack } from '@mui/system';
import { useState } from 'react';
import { Box, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { Routes, Route, Link, Navigate } from "react-router-dom";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState("");

  return (

    <Stack>
      {
        (isLogin) ?
          null
          :
          <ul className='navBar'>
            <li> <Link to={`/`}>Login</Link> </li>
            <li> <Link to={`/signup`}>Signup</Link> </li>
          </ul>
      }


      {(isLogin) ?

        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        :
        <Routes>
          <Route path="/" element={<Login set={setIsLogin} />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      }
    </Stack>

  );
}

export default App;
