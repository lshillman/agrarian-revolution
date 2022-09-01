import React from "react"
import {Popup} from "react-leaflet";

const VeggiePopup = ({ veggie }) => {

    return(
    <Popup>
        <div style={{maxWidth: "300px"}}>
        <h4>{veggie.type}</h4>
        <button>Request</button>
        <p>{veggie.description}</p>
        {veggie.photo && <img src={veggie.photo} alt={veggie.type} style={{width: "100%"}} />}
        <p>Posted on {veggie.postedDate}</p>
        </div>
    </Popup>
    );


};


export default VeggiePopup;