import React, { useRef, useState } from "react";
import moment from "moment";
import VeggieResponses from "./VeggieResponses";
import icons from "../utils/icons";
import { useParams } from "react-router-dom";
import { QUERY_REQUEST } from "../utils/queries";
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_RESPONSE } from "../utils/mutations";


export default function VeggiesRequests() {
    const { requestId } = useParams();
    console.log(requestId)

    const { loading, data, error } = useQuery(QUERY_REQUEST, { variables: { _id: requestId } });
    const request = data?.request || [];
    // console.log(request)
    console.log(loading)
    console.log(data)
    if (error) console.error(error)

    // Mutation to populate a request's array of responses
    const [createResponse] = useMutation(CREATE_RESPONSE)
    // Store the newly-typed response to pass to our createResponse mutation
    const [response, setResponse] = useState("");
    // Used to empty response text box when the user clicks Send
    const ref = useRef(null);

    // Populate database with the newly-created response
    const sendResponse = async (e) => {
        e.preventDefault();
        try {
            await createResponse({
                variables: { _id: requestId, content: response, sender: localStorage.getItem('_id') }
            })

            setResponse("");
            ref.current.value = "";
            window.location.reload();
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            {loading ? (<div>Loading...</div>) :
                (
                    <>
                        {request.map((request, i) => (
                            <>
                                <div className="single-response" key={i}>
                                    <img src={icons[request.veggie.type].options.iconUrl} alt="veggie icon" />
                                    <p className="sender-meta"><strong>{request.requestor.username}</strong> <span className="message-timestamp">{moment(request.timestamp).fromNow()}</span></p>
                                    <p>{request.content}</p>
                                </div>
                                {/* Traverse the request's array of responses */}
                                <div>
                                    {request.responses.map((response, i) => (
                                        <VeggieResponses request={request} response={response} key={i} />
                                    ))}
                                    <form className="response-form" onSubmit={(e) => sendResponse(e)}>
                                        <textarea ref={ref} placeholder={"Reply to " + request.requestor.username} onChange={(e) => setResponse(e.target.value)}></textarea>
                                        <button>Send</button>
                                    </form>
                                </div>
                            </>
                        ))}
                    </>
                )}
        </div>
    )
}