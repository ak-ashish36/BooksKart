import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login(props) {
    document.title = "BooksKart-Login";
    // const host = "http://localhost:5000";
    const host="https://bookskart-ak.herokuapp.com";

    //Setting the value of email and password which is to be send to fetch api 
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    // useNavigate hook is used for redirecting to pages
    let navigate = useNavigate();
    //Action to be done after clicking submit button
    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = `${host}/${props.user}login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            //Manually sending the email and password as a body 
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        //Getting the response from backend
        const json = await response.json()
        if (json.success) {
            localStorage.setItem(`${props.user}-token`, json.id);
            props.showAlert('Logged in Successfully', 'success');
            if (props.user === "user") {
                navigate('/');
            } else {
                navigate('/adminpage');
            }
        }
        else {
            props.showAlert('Invalid Credentials', 'danger')
        }
    }
    return (
        <>
            <h2>{capitalizeFirstLetter(props.user)} Login Panel</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                {props.user === "user" && <div class="text-center">
                    <p>New User? <Link to="/usersignup">Register</Link></p>
                </div>}
            </form>

        </>
    )
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export default Login

