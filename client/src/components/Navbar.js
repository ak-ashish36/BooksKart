import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
    let location = useLocation();
    //Handeling Logout 
    let navigate = useNavigate();
    let admintoken = localStorage.getItem('admin-token');
    let usertoken = localStorage.getItem('user-token');
    const handleLogout = () => {
        if (admintoken && usertoken) {
            localStorage.removeItem('admin-token');
            localStorage.removeItem('user-token');
            navigate('/');
        }
        else if (admintoken) {
            localStorage.removeItem('admin-token');
            navigate('/adminlogin');
        }
        else if (usertoken) {
            localStorage.removeItem('user-token');
            navigate('/userlogin');
        }
    }
    return (
        <nav className="fixed-top navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Book Management</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/userpage" ? "active" : ""}`} aria-current="page" to="/userpage">UserPage</Link>
                        </li>
                        {usertoken && <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/userbooks" ? "active" : ""}`} aria-current="page" to="/userbooks">My Books</Link>
                        </li>}
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/adminpage" ? "active" : ""}`} aria-current="page" to="/adminpage">AdminPage</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        {!admintoken && !usertoken ? <><Link className="btn btn-outline-primary mx-2" role="button" to="/userlogin" type="submit">UserLogin</Link>
                            <Link className="btn btn-outline-primary mx-2" role="button" to="/adminlogin" type="submit">AdminLogin  </Link></>
                            : <button onClick={handleLogout} className="btn btn-outline-primary mx-2">Logout</button>}
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
