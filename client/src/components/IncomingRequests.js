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
                    return <div className="single-request" key={i}>
                        <div className="single-request-header">
                            {/* <img src={icons[veggie.type].options.iconUrl} alt="veggie icon" /> */}
                            {/* <h2>Someone wants your {veggie.type}</h2> */}
                        </div>
                        <div>
                            {/* traverse the user's veggies' requests array */}
                            {veggie.requests.map((req, i) => (
                                <>
                                    <div className="single-response">
                                        <img src={icons[veggie.type].options.iconUrl} alt="veggie icon" />
                                        <p className="sender-meta"><strong>{req.requestor.username}</strong> <span className="message-timestamp">{moment(req.timestamp).fromNow()}</span></p>
                                        <p>{req.responses.length ? req.responses[req.responses.length - 1].content : req.content}</p>
                                    </div>
                                    <button className="delete-veggie-btn" id={req._id} onClick={(e) => displayResponses(e)}>
                                        <Link to={`/requests/${req._id}`}>
                                            Respond
                                        </Link>
                                    </button>
                                </>
                            ))}
                        </div>
                    </div>
                }
                return <></>
            })}
        </>
    );
}