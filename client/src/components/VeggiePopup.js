import React, { useState } from "react"
import { Link } from 'react-router-dom';
import { Popup } from "react-leaflet";
import moment from "moment";
import Auth from "../utils/auth";
import { Modal } from 'react-bootstrap';
import RequestVeggieForm from "./RequestVeggieForm";


const VeggiePopup = ({ veggie }) => {

    const [showReqModal, setShowReqModal] = useState(false);

    return (
        <>
            <Modal
                size='lg'
                show={showReqModal}
                onHide={() => setShowReqModal(false)}
                aria-labelledby='veggie-modal'>

                <Modal.Header closeButton>
                    <Modal.Title>Post a Veggie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RequestVeggieForm handleModalClose={() => setShowReqModal(false)} veggie={veggie} />
                </Modal.Body>

            </Modal>

            <Popup>
                <div style={{ maxWidth: "300px" }}>
                    <h4>{veggie.type}</h4>
                    {Auth.loggedIn() ? <button onClick={() => setShowReqModal(true)}>Request</button> : <><Link to="/signup">Sign up</Link> to request this veggie!</>}
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