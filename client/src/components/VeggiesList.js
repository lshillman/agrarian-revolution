import React from "react"

const VeggiesList = ({ veggies, veggieClicked, selectedVeggie, onClickShowMarker }) => {
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
            {veggies.map((veggie, i) => (
                <>
                    <div className="veggie-list-item" onClick={() => onClickShowMarker(i)}>
                        {veggie._id === selectedVeggie.current ? <h4 style={styles.h4}>{veggie.type}</h4> : <h4>{veggie.type}</h4>}
                    </div>
                </>
            ))}
        </div>
    )
}

export default VeggiesList;