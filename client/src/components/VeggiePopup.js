import React from "react"
import { Link } from 'react-router-dom';
import { Popup } from "react-leaflet";
import Auth from "../utils/auth";

const VeggiePopup = ({ veggie }) => {

    return (
        <Popup>
            <div style={{ maxWidth: "300px" }}>
                <h4>{veggie.type}</h4>
                {Auth.loggedIn() ? <button>Request</button> : <><Link to="/signup">Sign up</Link> to request this veggie!</>}
                <p>{veggie.description}</p>
                {veggie.photo && <img src={veggie.photo} alt={veggie.type} style={{ width: "100%" }} />}
                <p>Posted on {veggie.postedDate}</p>
            </div>
        </Popup>
    );


};


export default VeggiePopup;