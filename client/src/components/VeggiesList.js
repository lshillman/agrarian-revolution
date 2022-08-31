import React from "react"

const VeggiesList = ({ veggies }) => {
    if (!veggies || !veggies.length) {
        return <h3>No veggies yet</h3>;
    }

    return (
        <div>
            {veggies.map((veggie) => (
                <h4>{veggie.type}</h4>
            ))}
        </div>
    )
}

export default VeggiesList;