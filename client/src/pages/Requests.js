import React, { useState } from "react";
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

    const sendResponse = async (e, reqId) => {
        e.preventDefault();
        try {
            await createResponse({
                variables: { _id: reqId, content: response, sender: localStorage.getItem('_id') }
            })

            setResponse("");
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <main>
            <h1>Requests</h1>
            {loading ? (<div>loading...</div>) : (
                <div className="my-veggies-list">
                    {/* travers the user's veggies */}
                    {veggiesRequests.map((veggie, i) => {
                        if (veggie.requests.length) {
                            return <div className="my-single-veggie" key={i}>
                                <img src={icons[veggie.type].options.iconUrl} alt="veggie icon" />
                                <div>
                                    {/* travers the user's veggies' requests array */}
                                    {veggie.requests.map((req, i) => (
                                        <div key={i}>
                                            <h4>{req.requestor.username}</h4>
                                            <p className="veggie-desc">{req.content}</p>
                                            <p>{moment(req.timestamp).fromNow()}</p>
                                            {req.responses.map((responses, i) => (
                                                <div key={i}>
                                                    <p className="veggie-desc">{responses.content}</p>
                                                    {/* if id matches local storage, then render that username. else requestor username */}
                                                    <p className="veggie-desc">{(responses.sender._id === localStorage.getItem('_id')) ? localStorage.getItem('username') : req.requestor.username}</p>
                                                    <p className="veggie-desc">{responses.timestamp}</p>
                                                </div>
                                            ))}
                                            <form className="response-form" onSubmit={(e) => sendResponse(e, req._id)}>
                                                <textarea onChange={(e) => setResponse(e.target.value)}></textarea>
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