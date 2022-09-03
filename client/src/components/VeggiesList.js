import React from "react"
import moment from 'moment';
import icons from "../utils/icons";

const VeggiesList = ({ veggies, veggieClicked, selectedVeggie, onClickShowMarker, userUsername }) => {
    if (!veggies?.length) {
        return <h3>No veggies yet</h3>;
    }

    const styles = {
        h4: {
            backgroundColor: "#ccc"
        }
    }

    return (
        <div>
            {veggies.map((veggie, i) => {
                if (veggie.owner.username !== userUsername){
                return <div className="veggie-list-item" onClick={() => onClickShowMarker(i)} key={i}>
                    <img src={icons[veggie.type].options.iconUrl} alt="veggie icon"/>
                    {/* {veggie._id === selectedVeggie.current ? <h4 style={styles.h4}>{veggie.type}</h4> : <h4>{veggie.type}</h4>} */}
                    <h4>{veggie.type}</h4>
                    <p>{moment(veggie.postedDate).fromNow()}</p>
                </div>}
                return <></>
            })}
        </div>
    )
}

export default VeggiesList;