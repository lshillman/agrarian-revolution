import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from "../utils/queries";
import VeggiesRequests from "../components/VeggieRequests";
import { Link } from "react-router-dom";
import icons from "../utils/icons";
import moment from "moment";
import OutgoingRequests from "../components/OutgoingRequests";



export default function Requests() {
    // Query our current user's array of veggies
    const { loading, data } = useQuery(QUERY_USER, { variables: { _id: localStorage.getItem('_id') } });
    const veggiesRequests = data?.user[0].veggies || [];


    // Ability to display responses
    const [showResponses, setShowResponses] = useState(false);
    // button id
    const [btnId, setBtnId] = useState("");



    const displayResponses = (e) => {
        setBtnId(e.currentTarget.id);
        setShowResponses(prev => !prev);
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
                                                <p>{req.content}</p>
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
                    <OutgoingRequests data={data} />
                </div>)
            }
        </main>
    )
}
// populate page with incoming requests (requests in my veggies)