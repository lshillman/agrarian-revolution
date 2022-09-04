import React, { useState } from 'react';
import Auth from "../utils/auth";
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

export default function Header() {

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    const [showModal, setShowModal] = useState(false);

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
                    {!Auth.loggedIn() && <button id="signup-btn"onClick={() => setShowModal(true)}>Signup</button>}
                    {!Auth.loggedIn() && <button id="login-btn"onClick={() => setShowModal(true)}>Login</button>}
                    <Modal
                        size='lg'
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        aria-labelledby='login-modal'>

                        <Modal.Header closeButton>
                            <Modal.Title>Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <LoginForm handleModalClose={() => setShowModal(false)} />
                        </Modal.Body>
                    </Modal>
                    <Modal
                        size='lg'
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        aria-labelledby='signup-modal'>

                        <Modal.Header closeButton>
                            <Modal.Title>Signup</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SignupForm handleModalClose={() => setShowModal(false)} />
                        </Modal.Body>
                    </Modal>

                </div>
            </div>
        </header>
    )
}