import React, { useRef, useState } from "react";
import moment from "moment";
import icons from "../utils/icons";
import { Link } from "react-router-dom";


export default function OutgoingRequests(props) {


    const outgoingRequests = props.data.user[0].sent_requests
    console.log(outgoingRequests)



    return (
        <>
            <h2>Veggies I Want</h2>
            <div className="requests-list">
                {/* traverse the user's veggies */}
                {/* if (outgoingRequests.length) */}
                {outgoingRequests.map((request, i) => {
                    return <div className="single-request" key={i}>
                        <div className="single-request-header">
                            <img src={icons[request.veggie.type].options.iconUrl} alt="veggie icon" />
                            <h2>Request for {request.veggie.owner.username}'s {request.veggie.type}</h2>
                        </div>
                        <div>
                            {/* traverse the user's veggies' requests array */}
                            {request.responses.length ? request.responses[request.responses.length - 1].content : request.content}
                            {console.log(request.content)}

                            {/* <> 
                                            <div className="single-response">
                                                <p className="sender-meta"><strong>{req.requestor.username}</strong> <span className="message-timestamp">{moment(req.timestamp).fromNow()}</span></p>
                                                <p>{req.content}</p>
                                            </div>
                                            <button className="delete-veggie-btn" id={req._id}>
                                                <Link to={`/requests/${req._id}`}>
                                                    Respond
                                                </Link>
                                            </button>
                                        </> */}
                            <button className="delete-veggie-btn" id={request._id}>
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