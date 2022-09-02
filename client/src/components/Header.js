import React from "react";
import Auth from "../utils/auth";
import { Link } from 'react-router-dom';

export default function Header() {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <div id="header">
            <h1 id="agrirify"><Link to="/">agrarify</Link></h1>
            
            <div id="nav">
                <nav id="nav-links">
                    <Link to="/"><h3>Find Veggies</h3></Link>
                    <Link to="/"><h3>My Veggies</h3></Link>
                    <Link to="/"><h3>Requests</h3></Link>
                </nav>
            </div>
            <div id="login">
            {Auth.loggedIn() && <button id="logout-btn" onClick={logout}>Logout</button>}
            {!Auth.loggedIn() && <button id="login-btn"><Link to="/login">Login</Link></button>}
            </div>
        </div>
    )
}