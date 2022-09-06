import React, { useState } from 'react';
import Auth from "../utils/auth";
import { Link } from 'react-router-dom';
import { Button, Modal, Tab, Nav } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


export default function Header() {

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    const [showModal, setShowModal] = useState(false);

    return (
        <header>
            
        <Navbar expand="md">
            <Container fluid>
                <Link to="/" className="logo-link"><img src={require('./assets/agrarify-logo.svg').default} alt="Agrarify Logo" /></Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="mx-auto my-2 my-lg-0 justify-content-between w-100 align-items-center">
                        <div></div>
                        {Auth.loggedIn() && <div id="nav-links"
                            style={{ maxHeight: '100px', display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                            <Link to="/">Find Veggies</Link>
                            <Link to="/veggies">My Veggies</Link>
                            <Link to="/requests">Requests</Link>
                        </div>}
                        <div id="auth-buttons">
                            {Auth.loggedIn() && <button id="logout-btn" onClick={logout}>Logout</button>}
                            {!Auth.loggedIn() && <button id="login-signup-btn" onClick={() => setShowModal(true)}>Login/Signup</button>}
                        </div>

                    </Nav>

                </Navbar.Collapse>
            </Container>
            <Modal
                size='md'
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
        </Navbar>
        
        </header>
    );
}