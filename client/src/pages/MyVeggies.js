import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from "../utils/queries";
import icons from "../utils/icons";
import moment from "moment";

export default function MyVeggies() {
    const { loading, data } = useQuery(QUERY_USER, {variables: {_id: localStorage.getItem('_id')}});
    const veggies = data?.user[0].veggies || [];
    console.log(data);
    return (
        <main>
        { loading ? (<div>loading...</div>) : (
        <div className="my-veggies-list">
            {veggies.map((veggie, i) => {
                return <div className="my-single-veggie" key={i}>
                        <img src={icons[veggie.type].options.iconUrl} alt="veggie icon" />
                        <div>
                        <h4>{veggie.type}</h4>
                        <p>{moment(veggie.postedDate).fromNow()}</p>
                        <p className="veggie-desc">{veggie.description}</p>
                    </div>
                    <button className="delete-veggie-btn">Delete</button>
                </div>
            })}
        </div>)
    }
    </main>)

}