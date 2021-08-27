import React, { useState } from 'react';
import Axios from 'axios';
import './App.css';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    //arrow function to save the email
    let saveEmail = (event) => {
        setEmail(event.target.value);
        // alert(emailReg);
    };

    //arrow function to save the password
    let savePassword = (event) => {
        setPassword(event.target.value);
        // alert(passwordReg);
    };

    //arrow function to save the role
    let saveRole = (event) => {
        event.preventDefault();
        setRole(event.target.value);
        // alert(role);
    };
    //arrow fuction to register the users

    let login = () => {

        // alert(email); // alert(password);// alert(role);

        // send the data to the backend 
        Axios.post("http://localhost:3001/login", {
            email: email,
            password: password,
            role: role,
        }).then((response) => {
            // check if an error
            if (response.data.message) {
                setLoginStatus(response.data.message);
            }
            else {
                setLoginStatus(response.data[0].email);
            }
        }).catch(err => console.log(err));

    };

    return (
        <div className="container text-center">
            <form>
                <div className="form-group mt-5">

                    <input type="email" className="form-control" autoComplete="off" onChange={saveEmail} placeholder="Enter email" required />

                </div>
                <div className="form-group mt-2">

                    <input type="password" className="form-control" autoComplete="off" onChange={savePassword} placeholder="Password" required />
                </div>

                <select className="form-select mt-2" autoComplete="off" onChange={saveRole} required>
                    <option>Role</option>
                    <option value="student">Student</option>
                    <option value="librarian">Librarian</option>
                    <option value="admin">Admin</option>
                </select>
                {/* if we put type = submit then page is auto reloaded */}
                <button type="button" className="btn btn-primary mt-2" onClick={login}>Submit</button>
                <h1>{loginStatus}</h1>
            </form>
        </div>

    )

}

export default Login
