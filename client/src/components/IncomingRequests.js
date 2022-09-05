import React from "react";
import icons from "../utils/icons";
import moment from "moment";
import { Link } from "react-router-dom";




export default function IncomingRequests({ veggiesRequests, displayResponses }) {
    return (
        <>
            <h2>Requests for your veggies</h2>
            {veggiesRequests.map((veggie, i) => {
                if (veggie.requests.length) {
                    return <div className="request-group" key={i}>
                        {/* traverse the user's veggies' requests array */}
                        {veggie.requests.map((req, i) => (
                            <div className="single-request" key={i}>
                                    
                                    <div className="request-meta">
                                        <img src={icons[veggie.type].options.iconUrl} alt="veggie icon" />
                                        <p className="sender-meta"><strong>{req.requestor.username}</strong><br></br><span className="message-timestamp">{moment(req.timestamp).fromNow()}</span></p>
                                    
                                    <p className="snippet">{req.responses.length ? req.responses[req.responses.length - 1].content : req.content}</p>
                                    </div>
                                <button className="respond-btn" id={req._id} onClick={(e) => displayResponses(e)}>
                                    <Link to={`/requests/${req._id}`}>
                                        Respond
                                    </Link>
                                </button>
                            </div>
                        ))}
                    </div>
                }
                return <></>
            })}
        </>
    );
}