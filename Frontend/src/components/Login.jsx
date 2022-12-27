import { useState, useContext } from "react";
import { GlobalContext } from '../context/Context';
import { Button, TextField } from '@mui/material';
import axios from "axios";

let baseUrl = "";
if (window.location.href.split(":")[0] === "http") {
    baseUrl = "http://localhost:5001"
}


function Login() {

    const [result, setResult] = useState("");
    let { state, dispatch } = useContext(GlobalContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${baseUrl}/api/v1/login`, {
                email: email,
                password: password
            }, {
                withCredentials: true
            })
            dispatch({
                type: 'USER_LOGIN',
                payload: null
            })

            console.log("login successful");
            setResult("login successful")

        } catch (e) {
            console.log("e: ", e);
        }

        // e.reset();
    }


    return (
        <>
            <h4>This is Login page</h4>

            <form onSubmit={loginHandler} className="loginForm">


                <TextField
                    className="TextField"
                    id="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="username"
                    placeholder="email"
                    autoComplete="username"
                    onChange={(e) => { setEmail(e.target.value) }}
                />


                <br />

                <TextField
                    className="TextField"
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="current-password"
                    autoComplete="current-password"
                    placeholder="password"
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <br />
                <Button variant="outlined" type="submit">Login</Button>

            </form>


            <p>{result}</p>
        </>
    )
}

export default Login;