import React, { useEffect, useState } from 'react';
import '../styles/login.css';
import '../styles/addstudent.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("");
    const navigate = useNavigate();
    axios.defaults.withCredentials = true; // For User Session

    const handleLogin = () => {
        axios.post('http://localhost:5000/admin/login', {
            username: userName,
            password: password,
        }).then((response) => {
            setPassword("");
            setUserName("");
            console.log(response);
            if (response.data.status === "Success")
            {
                navigate("/home")
            }
            else{
                setResult(response.data.message);
            }
        })
    }
    // useEffect(() => {
    //     axios.get("http://localhost:5000/login")
    //         .then((response) => {
    //             console.log(response)
    //             if (response.session.status === "Success") {
    //                 setResult(response.session.user[0].userName)
    //             }
    //         })
    // }, [])
    return (
        <div>
             <header className="Stuheading">
                <h1>Welcome to Login</h1>
            </header>
            <div className='Login'>
                <h1>Login</h1>
                <input type="text" value={userName} placeholder='Username...' onChange={(event) => { setUserName(event.target.value) }}></input>
                <input type="password" value={password} placeholder='Password...' onChange={(event) => { setPassword(event.target.value) }}></input>
                <button onClick={handleLogin}>Login</button>
            </div>
            <div>
                {
                    result === "" ? null : <h4>{result}</h4>
                }
            </div>
        </div>
    )
}
export default Login;