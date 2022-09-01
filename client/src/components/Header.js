import React from "react";
import Auth from "../utils/auth";

export default function Header() {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <div>
            <h1>header</h1>
            {Auth.loggedIn() && <button onClick={logout}>Logout</button>}
        </div>
    )
}