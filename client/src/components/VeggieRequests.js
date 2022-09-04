import React from "react";
import moment from "moment";
import VeggieResponses from "./VeggieResponses";
import icons from "../utils/icons";


export default function VeggiesRequests({ veggie, reference, btnId, currVeg, request, sendResponse, setResponse, showResponses }) {
    const hideResponses = {
        display: (showResponses && btnId === currVeg) ? "block" : "none"
    }

    return (
        <div>
            <div className="single-response">
            <img src={icons[veggie.type].options.iconUrl} alt="veggie icon" />
                <p className="sender-meta"><strong>{request.requestor.username}</strong> <span className="message-timestamp">{moment(request.timestamp).fromNow()}</span></p>
                <p>{request.content}</p>
            </div>
            {/* Traverse the request's array of responses */}
            <div id={currVeg} style={hideResponses}>
                {request.responses.map((response, i) => (
                    <VeggieResponses request={request} response={response} key={i} />
                ))}
                <form className="response-form" onSubmit={(e) => sendResponse(e, request._id)}>
                    <textarea ref={reference} placeholder={"Reply to " + request.requestor.username} onChange={(e) => setResponse(e.target.value)}></textarea>
                    <button>Send</button>
                </form>
            </div>
        </div>
    )
}