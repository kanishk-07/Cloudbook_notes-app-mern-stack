import './Navbar.css';
import React from 'react';
//import { Link, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Navbar() {
    //let navigate = useNavigate();
    const handleLogout = ()=> {
        localStorage.removeItem('token');
        //navigate('/login');
    }
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav mx-5">
                        <li className="nav-item mx-5">
                            <Link className="navbar-brand" to="/">
                                <img src="logo192.png" alt="" width="30" height="30" className="d-inline-block align-text-top" aria-current="page" />
                                iNotebook
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mx-5">
                        <li className="nav-item mx-1">
                            {!localStorage.getItem('token') ? <Link className="btn btn-outline-info" to="/login">Login</Link> : <Link className="btn btn-outline-info" to="/login" onClick={handleLogout}>Logout</Link>}
                        </li>
                        {!localStorage.getItem('token') && <li className="nav-item mx-1">
                            <Link className="btn btn-outline-info" to="/signup">Sign up</Link>
                        </li>}
                        <li className="nav-item mx-5">
                            <Link className="btn btn-info" to="/about">About</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}