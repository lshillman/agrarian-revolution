import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from "../utils/queries";
import OutgoingRequests from "../components/OutgoingRequests";
import IncomingRequests from "../components/IncomingRequests";

export default function Requests() {
    // Query our current user's array of veggies
    const { loading, data } = useQuery(QUERY_USER, { variables: { _id: localStorage.getItem('_id') } });
    const veggiesRequests = data?.user[0].veggies || [];
    const sentRequests = data?.user[0].sent_requests || [];

    let count = 0;
    veggiesRequests?.map(veggie => {
        if (veggie.requests) {
            count++;
        }
    })
    console.log(count);
    return (
        <main>
            <div id="main-content">
                <h1>Requests</h1>
                {loading ? (<div>Loading...</div>) : (
                    count === 0 && sentRequests.length === 0 ? (
                        <div>You have not made or received requests yet</div>
                    ) : (
                        <div className="requests-list">
                            {count > 0 ? <IncomingRequests veggiesRequests={veggiesRequests} /> : null}
                            {sentRequests.length > 0 ? <OutgoingRequests sentRequests={sentRequests} /> : null}
                        </div>
                    )
                )}
            </div>
        </main>
    )
}