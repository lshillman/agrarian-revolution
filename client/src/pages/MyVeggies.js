import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from "../utils/queries";
import { DELETE_VEGGIE } from "../utils/mutations";
import icons from "../utils/icons";
import moment from "moment";
import PostVeggieModal from "../components/PostVeggieModal";
import DeleteBtn from "../components/DeleteBtn";
import EditVeggieModal from "../components/EditVeggieModal";

export default function MyVeggies() {
    const { loading, data } = useQuery(QUERY_USER, { variables: { _id: localStorage.getItem('_id') } });
    const veggies = data?.user[0].veggies || [];
    const [deleteVeggie] = useMutation(DELETE_VEGGIE);
    console.log(data)


    const handleVeggieDelete = async (id) => {
        try {
            await deleteVeggie({ variables: { _id: id } })
            window.location.reload();
        }
        catch (e) {
            console.error(e);
        }
    }


    return (
        <main>
            <div id="main-content">
            {loading ? (<div>loading...</div>) : (
                <div className="my-veggies-list">
                    <div id="top">
                        <div id="top-search">
                            <h1>Your Veggies</h1>
                            <PostVeggieModal />
                        </div>
                    </div>
                    {veggies.map((veggie, i) => {
                        return (
                            <div className="single-veggie" key={i}>
                                <div className="veggie-meta">
                                    <img src={icons[veggie.type].options.iconUrl} alt="veggie icon" />
                                    <div>
                                        <h4>{veggie.type}</h4>
                                        <span className="timestamp">Qty: {veggie.quantity.toLocaleString()} • {moment(veggie.postedDate).fromNow()}</span>
                                        <p className="veggie-desc">{veggie.description}</p>
                                    </div>
                                    {veggie.photo ? <img src={veggie.photo} alt="user's veggie" /> : <></>}
                                </div>
                                <div className="veggie-actions">
                                    <EditVeggieModal veggie={veggie} />
                                    <DeleteBtn veggieDelete={() => handleVeggieDelete(veggie._id)} />
                                </div>
                                {/* <button className="delete-veggie-btn" onClick={handleDeleteButton}>Delete</button>
                            <button className="confirm-delete" style={{ display: 'none', backgroundColor: 'red' }} onClick={() => handleVeggieDelete(veggie._id)} >Confirm</button> */}
                            </div>
                        )
                    })}
                </div>)
            }
            </div>
        </main>)

}