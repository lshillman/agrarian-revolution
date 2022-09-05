import React, { useRef, useState } from "react";
import moment from "moment";
import icons from "../utils/icons";
import { Link } from "react-router-dom";
import auth from "../utils/auth";


export default function OutgoingRequests(props) {


    const outgoingRequests = props.data.user[0].sent_requests
    console.log(outgoingRequests)



    return (
        <>
            <h2>Requests you've sent</h2>
            <div className="request-group">
                {/* traverse the user's veggies */}
                {/* if (outgoingRequests.length) */}
                {outgoingRequests.map((request, i) => {
                    return <div className="single-request" key={i}>
                        <div className="request-meta">
                            <img src={icons[request.veggie.type].options.iconUrl} alt="veggie icon" />
                            <p className="sender-meta"><strong>{request.veggie.owner.username}</strong><br></br><span className="message-timestamp">{moment(request.timestamp).fromNow()}</span></p>
                            <p className="snippet">{request.responses.length ? request.responses[request.responses.length - 1].content : request.content}
                                {console.log(request.content)}</p>
                        </div>
                        <div>
                            {console.log(request._id)}
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