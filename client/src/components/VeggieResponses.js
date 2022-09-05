import React from "react";
import moment from "moment";

export default function VeggieResponses({ response, request }) {
    return (
        <div className="single-response hide-response">
            {/* if id matches local storage, then render "You". else, requestor's username */}
            <p className="sender-meta"><strong>{(response.sender._id === localStorage.getItem('_id')) ? "You" : response.sender.username}</strong> <span className="message-timestamp">{moment().calendar(response.timestamp)}</span></p>
            <p>{response.content}</p>
        </div>
    )
}