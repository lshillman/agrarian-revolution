import React, { useState, useRef } from "react";
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_RESPONSE } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
import icons from "../utils/icons";
import VeggiesRequests from "../components/VeggieRequests";

export default function Requests() {
    // Query our current user's array of veggies
    const { loading, data } = useQuery(QUERY_USER, { variables: { _id: localStorage.getItem('_id') } });
    const veggiesRequests = data?.user[0].veggies || [];
    // Mutation to populate a request's array of responses
    const [createResponse] = useMutation(CREATE_RESPONSE)
    // Store the newly-typed response to pass to our createResponse mutation
    const [response, setResponse] = useState("");
    // Used to empty response text box when the user clicks Send
    const ref = useRef(null);

    // Populate database with the newly-created response
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
            {loading ? (<div>Loading...</div>) : (
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
                                        <VeggiesRequests reference={ref} request={req} sendResponse={sendResponse} setResponse={setResponse} key={i}/>
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