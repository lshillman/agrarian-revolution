import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from "../utils/queries";
import VeggiesRequests from "../components/VeggieRequests";
import { Link } from "react-router-dom";
import icons from "../utils/icons";
import moment from "moment";
import OutgoingRequests from "../components/OutgoingRequests";
import IncomingRequests from "../components/IncomingRequests";



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
                    <IncomingRequests veggiesRequests={veggiesRequests} displayResponses={displayResponses} />
                    <OutgoingRequests data={data} />
                </div>)
            }
        </main>
    )
}
// populate page with incoming requests (requests in my veggies)