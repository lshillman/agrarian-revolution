import React from "react";
import Auth from "../utils/auth";
import { Link } from 'react-router-dom';

export default function Header() {

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <header>
            <div id="header-content">
                <img src={require('./assets/agrarify-logo.svg').default} alt="Agrarify Logo" />
                    <nav>
                        <Link to="/">Find Veggies</Link>
                        <Link to="/veggies">My Veggies</Link>
                        <Link to="/requests">Requests</Link>
                    </nav>
                <div id="login">
                    {Auth.loggedIn() && <button id="logout-btn" onClick={logout}>Logout</button>}
                    {!Auth.loggedIn() && <button id="login-btn"><Link to="/login">Login</Link></button>}
                    {!Auth.loggedIn() && <button id="signup-btn"><Link to="/signup">Signup</Link></button>}
                </div>
            </div>
        </header>
    )
}