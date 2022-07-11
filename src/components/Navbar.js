import './Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav mx-5">
                        <li className="nav-item">
                            <Link className="navbar-brand" to="/">
                                <img src="logo192.png" alt="" width="30" height="30" className="d-inline-block align-text-top" aria-current="page" />
                                iNotebook
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mx-5">
                        <li className="nav-item">
                            <Link className="btn btn-info" to="/about">About</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}