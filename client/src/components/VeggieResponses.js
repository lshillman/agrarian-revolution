import React from "react";
import moment from "moment";

export default function VeggieResponses({ hideResponses, response, request }) {
    return (
        <div className="single-response hide-response" style={hideResponses}>
            {/* if id matches local storage, then render "You". else, requestor's username */}
            <p className="sender-meta"><strong>{(response.sender._id === localStorage.getItem('_id')) ? "You" : request.requestor.username}</strong> <span className="message-timestamp">{moment(response.timestamp).fromNow()}</span></p>
            <p>{response.content}</p>
        </div>
    )
}