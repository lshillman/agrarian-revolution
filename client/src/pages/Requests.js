import React, { useState, useRef } from "react";
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_RESPONSE } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
import icons from "../utils/icons";
import moment from "moment";

export default function Requests() {
    const { loading, data } = useQuery(QUERY_USER, { variables: { _id: localStorage.getItem('_id') } });
    const veggiesRequests = data?.user[0].veggies || [];

    const [response, setResponse] = useState("");

    const [createResponse] = useMutation(CREATE_RESPONSE)

    const ref = useRef(null);

    const sendResponse = async (e, reqId) => {
        e.preventDefault();
        try {
            await createResponse({
                variables: { _id: reqId, content: response, sender: localStorage.getItem('_id') }
            })

            setResponse("");
            ref.current.value = "";
            window.location.reload();
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <main>
            <h1>Requests</h1>
            {loading ? (<div>loading...</div>) : (
                <div className="requests-list">
                    {/* traverse the user's veggies */}
                    {veggiesRequests.map((veggie, i) => {
                        if (veggie.requests.length) {
                            return <div className="single-request" key={i}>
                                <div className="single-request-header">
                                    <img src={icons[veggie.type].options.iconUrl} alt="veggie icon" />
                                    <h2>Someone wants your {veggie.type}</h2>
                                </div>
                                <div>
                                    {/* traverse the user's veggies' requests array */}
                                    {veggie.requests.map((req, i) => (
                                        <div key={i}>
                                            <div className="single-response">
                                                <p className="sender-meta"><strong>{req.requestor.username}</strong> <span className="message-timestamp">{moment(req.timestamp).fromNow()}</span></p>
                                                <p>{req.content}</p>
                                            </div>
                                            {req.responses.map((response, i) => (
                                                <div className="single-response" key={i}>
                                                    {/* if id matches local storage, then render that username. else requestor username */}
                                                    <p className="sender-meta"><strong>{(response.sender._id === localStorage.getItem('_id')) ? "You" : req.requestor.username}</strong> <span className="message-timestamp">{moment(response.timestamp).fromNow()}</span></p>
                                                    <p>{response.content}</p>
                                                </div>
                                            ))}
                                            <form className="response-form" onSubmit={(e) => sendResponse(e, req._id)}>
                                                <textarea ref={ref} placeholder={"Reply to " + req.requestor.username} onChange={(e) => setResponse(e.target.value)}></textarea>
                                                <button>Send</button>
                                            </form>
                                        </div>
                                    ))}
                                </div>
                                <button className="delete-veggie-btn" >Respond</button>
                            </div>
                        }
                        return <></>
                    })}
                </div>)
            }
        </main>
    )
}
// populate page with incoming requests (requests in my veggies)