import React from "react"
import moment from 'moment';
import icons from "../utils/icons";

const VeggiesList = ({ veggies, onClickShowMarker, userUsername }) => {
    if (!veggies?.length) {
        return <h3>No veggies yet</h3>;
    }

    return (
        <div>
            {veggies.map((veggie, i) => {
                if (veggie.owner.username !== userUsername) {
                    return <div className="veggie-list-item" onClick={() => onClickShowMarker(i)} key={i}>
                        <img src={icons[veggie.type].options.iconUrl} alt="veggie icon" />
                        <h4>{veggie.type}</h4>
                        <p>{moment(veggie.postedDate).fromNow()}</p>
                    </div>
                }
                return <React.Fragment key={i}></React.Fragment>;
            })}
        </div>
    )
}

export default VeggiesList;