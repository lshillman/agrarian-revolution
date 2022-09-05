import React from "react"
import moment from 'moment';
import icons from "../utils/icons";

const VeggiesList = ({ veggies, onClickShowMarker, userUsername }) => {
    if (!veggies?.length) {
        return <h3>No veggies yet</h3>;
    }

    return (
        <div>
            {veggies.filter((veggie) => (veggie.owner.username !== userUsername)).map((veggie, i) => {
                return <div className="veggie-list-item" onClick={() => onClickShowMarker(i)} key={i}>
                    <img src={icons[veggie.type].options.iconUrl} alt="veggie icon" />
                    <div>
                        <h4>{veggie.type}</h4>
                        <p>{moment(veggie.postedDate).fromNow()}</p>
                    </div>
                </div>
            })}
        </div>
    )
}

export default VeggiesList;