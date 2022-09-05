import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from "../utils/queries";
import VeggiesRequests from "../components/VeggieRequests";
import { Link } from "react-router-dom";
import icons from "../utils/icons";
import moment from "moment";
import OutgoingRequests from "../components/OutgoingRequests";
import IncomingRequests from "../components/IncomingRequests";
import auth from "../utils/auth";



export default function Requests() {
    // Query our current user's array of veggies
    const { loading, data } = useQuery(QUERY_USER, { variables: { _id: localStorage.getItem('_id') } });
    const veggiesRequests = data?.user[0].veggies || [];

    return (
        <main>
            <h1>Requests</h1>
            {loading ? (<div>Loading...</div>) : (
                <div className="requests-list">
                    <IncomingRequests veggiesRequests={veggiesRequests} />
                    <OutgoingRequests data={data} />
                </div>)
            }
        </main>
    )
}