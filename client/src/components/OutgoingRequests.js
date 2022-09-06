import React from "react";
import moment from "moment";
import icons from "../utils/icons";
import { Link } from "react-router-dom";
import auth from "../utils/auth";


export default function OutgoingRequests({ sentRequests }) {
    return (
        <>
            <h2>Requests you've sent</h2>
            <div className="request-group">
                {/* traverse the user's veggies */}
                {/* if (outgoingRequests.length) */}
                {sentRequests.map((request, i) => {
                    return <div className="single-request" key={i}>
                        <div className="request-meta">
                            <img src={icons[request.veggie.type].options.iconUrl} alt="veggie icon" />
                            <p className="sender-meta"><strong>{request.veggie.owner.username}</strong><br></br><span className="message-timestamp">{moment(request.timestamp).fromNow()}</span></p>
                            <p className="snippet">{request.responses.length ? request.responses[request.responses.length - 1].content : request.content}</p>
                        </div>
                        <div>
                            <button className="respond-btn" id={request._id} onClick={!auth.loggedIn() ? window.location.replace('/') : null}>
                                <Link to={`/requests/${request._id}`}>
                                    Respond
                                </Link>
                            </button>

                        </div>
                    </div>

                })}
            </div>
        </>
    )



}