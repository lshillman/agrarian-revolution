import React, { useState } from "react"
import { Popup } from "react-leaflet";
import moment from "moment";
import Auth from "../utils/auth";
import RequestVeggieForm from "./RequestVeggieForm";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Modal, Tab, Nav } from 'react-bootstrap';



const VeggiePopup = ({ veggie }) => {

    const [showReqModal, setShowReqModal] = useState(false);
    const [showSULIModal, setShowSULIModal] = useState(false);

    return (
        <>
            <Modal
                size='md'
                show={showReqModal}
                onHide={() => setShowReqModal(false)}
                aria-labelledby='veggie-modal'>

                <Modal.Header closeButton>
                    <Modal.Title>Request {veggie.type}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RequestVeggieForm handleModalClose={() => setShowReqModal(false)} veggie={veggie} />
                </Modal.Body>

            </Modal>

            <Modal
                size='md'
                show={showSULIModal}
                onHide={() => setShowSULIModal(false)}
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
                                <LoginForm handleModalClose={() => setShowSULIModal(false)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey='signup'>
                                <SignupForm handleModalClose={() => setShowSULIModal(false)} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Modal.Body>
                </Tab.Container>
            </Modal>

            <Popup>
                <div style={{ maxWidth: "300px" }}>
                    <h4>{veggie.type}</h4>
                    {Auth.loggedIn() ? <button onClick={() => setShowReqModal(true)}>Request</button> : <><button onClick={() => setShowSULIModal(true)}>Log in</button> to request this veggie!</>}
                    <p>{veggie.description}</p>
                    <p>Qty: {veggie.quantity.toLocaleString()}</p>
                    {veggie.photo && <img src={veggie.photo} alt={veggie.type} style={{ width: "100%" }} />}
                    <p>Posted {moment(veggie.postedDate).fromNow()} by {veggie.owner.username}</p>
                </div>
            </Popup>
        </>
    );


};


export default VeggiePopup;