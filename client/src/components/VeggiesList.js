import React from "react"
import moment from 'moment';
import icons from "../utils/icons";

const VeggiesList = ({ veggies, onClickShowMarker, userUsername }) => {
    if (veggies.filter((veggie) => (veggie.owner.username !== userUsername)).length === 0) {
        return <h3>No veggies yet</h3>;
    }

    return (
        <div className="radios">
            {veggies.filter((veggie) => (veggie.owner.username !== userUsername)).map((veggie, i) => {
                return (
                    <React.Fragment key={i}>
                        <input type="radio" id={i} name="veggie-group"/>
                        <label className="radio" htmlFor={i}>
                            <div className="veggie-list-item" data-id={veggie._id} onClick={() => onClickShowMarker(i)} key={i}>
                                <img src={icons[veggie.type].options.iconUrl} alt="veggie icon" />
                                <div>
                                    <h4>{veggie.type}</h4>
                                    <p>{moment(veggie.postedDate).fromNow()}</p>
                                </div>
                            </div>
                        </label>
                    </React.Fragment>
                )
            })}
        </div>
    )
}

export default VeggiesList;