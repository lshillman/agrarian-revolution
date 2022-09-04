import React, { useState } from 'react';
import Auth from "../utils/auth";
import { Link } from 'react-router-dom';
import { Button, Modal, Tab, Nav } from 'react-bootstrap';
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
                    {!Auth.loggedIn() && <button id="login-signup-btn" onClick={() => setShowModal(true)}>Login/Signup</button>}


                    <Modal
                        size='lg'
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        aria-labelledby='signup-modal'>
                        {/* tab container to do either signup or login component */}
                        <Tab.Container defaultActiveKey='login'>
                            <Modal.Header closeButton>
                                <Modal.Title id='signup-modal'>
                                    <Nav variant='pills'>
                                        <Nav.Item>
                                            <Nav.Link eventKey='login'>Login</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Tab.Content>
                                    <Tab.Pane eventKey='login'>
                                        <LoginForm handleModalClose={() => setShowModal(false)} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey='signup'>
                                        <SignupForm handleModalClose={() => setShowModal(false)} />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Modal.Body>
                        </Tab.Container>
                    </Modal>

                </div>
            </div>
        </header>
    )
}