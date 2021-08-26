import React, { useState } from 'react';
import Axios from 'axios';
import '../App.css';

const Signup = () => {

    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [role, setRole] = useState("");

    //arrow function to save the email
    let saveEmail = (event) => {
        setEmailReg(event.target.value);
        // alert(emailReg);
    };

    //arrow function to save the password
    let savePassword = (event) => {
        setPasswordReg(event.target.value);
        // alert(passwordReg);
    };

    //arrow function to save the role
    let saveRole = (event) => {
        setRole(event.target.value);
        // alert(role);
    };
    //arrow fuction to register the users

    let register = () => {

        // alert(emailReg); // alert(passwordReg);// alert(role);

        // send the data to the backend 
        Axios.post("/register", {
            email: emailReg,
            password: passwordReg,
            role: role,
        }).then((response) => {
            console.log(response)
        }).catch(err => console.log(err));

    };

    return (
        <div className="container text-center">
            <form>
                <div className="form-group mt-5">

                    <input type="email" className="form-control" id="email" name="email" onChange={saveEmail} placeholder="Enter email" required />

                </div>
                <div className="form-group mt-2">

                    <input type="password" className="form-control" id="password" name="password" onChange={savePassword} placeholder="Password" required />
                </div>

                <select className="form-select mt-2" id="role" name="role" onChange={saveRole} required>
                    <option selected>Role</option>
                    <option value="student">Student</option>
                    <option value="librarian">Librarian</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="btn btn-primary mt-2" onClick={register}>Submit</button>
            </form>
        </div>

    )
}

export default Signup;
