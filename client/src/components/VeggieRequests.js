import React from "react";
import moment from "moment";
import VeggieResponses from "./VeggieResponses";


export default function VeggiesRequests({ reference,  request, sendResponse, setResponse, showResponses }) {
    const hideResponses = {
        display: showResponses ? "block" : "none"
    }

    return (
        <div>
            <div className="single-response">
                <p className="sender-meta"><strong>{request.requestor.username}</strong> <span className="message-timestamp">{moment(request.timestamp).fromNow()}</span></p>
                <p>{request.content}</p>
            </div>
            {/* Traverse the request's array of responses */}
            {request.responses.map((response, i) => (
                <VeggieResponses hideResponses={hideResponses} request={request} response={response} key={i} />
            ))}
            <form className="response-form" style={hideResponses} onSubmit={(e) => sendResponse(e, request._id)}>
                <textarea ref={reference} placeholder={"Reply to " + request.requestor.username} onChange={(e) => setResponse(e.target.value)}></textarea>
                <button>Send</button>
            </form>
        </div>
    )
}