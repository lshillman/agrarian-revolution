import React, { useState } from 'react';
import { CREATE_VEGGIE } from "../utils/mutations"
import { useMutation } from "@apollo/client"

const AddVeggieForm = () => {

    const [formState, setFormState] = useState({
        type: '',
        quantity: '',
        photo: '',
        description: ''
    });

    const [createVeggie, { error, data }] = useMutation(CREATE_VEGGIE)


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };


    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const owner = '63111bb1b0d8da8b00edaa83'
            const location = '10th and market 94103'
            const coordinates = [37.776541, -122.417501]

            console.log({ ...formState, owner, location, coordinates })
            console.log(formState)
            const { data } = await createVeggie({
                variables: { ...formState, owner, location, coordinates },
            });
            console.log(data)

            // Auth.login(data.createUser.token);
            
        } catch (e) {
            console.error(e);
        }

    };

    return (
        <>
            <h1>Add a Veggie</h1>
            <form onSubmit={handleFormSubmit}>
                <select name='type' onChange={handleChange}>
                    <option>select one</option>
                    <option value="apples">apples</option>
                    <option value="artichokes">artichokes</option>
                    <option value="asparagus">asparagus</option>
                    <option value="avocados">avocados</option>
                    <option value="basil">basil</option>
                    <option value="drybeans">beans - dry</option>
                    <option value="green">beans - green</option>
                    <option value="beets">beets</option>
                    <option value="bokchoy">bok choy</option>
                    <option value="broccoli">broccoli</option>
                    <option value="cabbage">cabbage</option>
                    <option value="carrots">carrots</option>
                    <option value="cauliflower">cauliflower</option>
                    <option value="celery">celery</option>
                    <option value="chard">chard</option>
                    <option value="cherries">cherries</option>
                    <option value="cilantro">cilantro</option>
                    <option value="cucumbers">cucumbers</option>
                    <option value="eggplants">eggplants</option>
                    <option value="eggs">eggs</option>
                    <option value="figs">figs</option>
                    <option value="garlic">garlic</option>
                    <option value="grapes">grapes</option>
                    <option value="kale">kale</option>
                    <option value="leeks">leeks</option>
                    <option value="lemons">lemons</option>
                    <option value="lettuce">lettuce</option>
                    <option value="limes">limes</option>
                    <option value="onions">onions</option>
                    <option value="oranges">oranges</option>
                    <option value="bellpeppers">peppers - bell</option>
                    <option value="hotpeppers">peppers - hot</option>
                    <option value="persimmons">persimmons</option>
                    <option value="plums">plums</option>
                    <option value="potatoes">potatoes</option>
                    <option value="pumpkins">pumpkins</option>
                    <option value="radishes">radishes</option>
                    <option value="spinach">spinach</option>
                    <option value="squashes">squashes</option>
                    <option value="sweetpotatoes">sweet potatoes</option>
                    <option value="tomatoes">tomatoes</option>
                    <option value="turnips">turnips</option>
                </select>
                <input
                    className="form-input"
                    placeholder="quantity"
                    name="quantity"
                    type="text"
                    value={formState.quantity}
                    onChange={handleChange}
                />
                <input
                    className="form-input"
                    placeholder="photo"
                    name="photo"
                    type="text"
                    value={formState.photo}
                    onChange={handleChange}
                />
                <input
                    className="form-input"
                    placeholder="description"
                    name="description"
                    type="text"
                    value={formState.description}
                    onChange={handleChange}
                />
                <button
                    className="btn btn-block btn-info"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                >
                    Submit
                </button>

            </form>

            {error && (
                <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                </div>
            )}
        </>
    )
}

export default AddVeggieForm