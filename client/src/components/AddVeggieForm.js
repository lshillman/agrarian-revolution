import React, { useState } from 'react';
import { CREATE_VEGGIE } from "../utils/mutations"
import { useMutation } from "@apollo/client"
import { Form } from 'react-bootstrap';


const AddVeggieForm = () => {

    const [formState, setFormState] = useState({
        type: '',
        quantity: '',
        photo: '',
        description: '',
    });

    const [createVeggie, { error }] = useMutation(CREATE_VEGGIE)

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

        if (formState.type && formState.quantity && formState.description) {

            try {
                const owner = localStorage.getItem('_id');
                const location = localStorage.getItem('location');
                const coordinates = JSON.parse(localStorage.getItem('coordinates'));
                const quantity = formState.quantity * 1 === 0 ? 1 : formState.quantity * 1;
                const photo = document.getElementById("upload-url").value;
                console.log(photo);

                await createVeggie({
                    variables: { ...formState, owner, location, coordinates, quantity, photo },
                });
                window.location.reload();
            } catch (e) {
                console.error(e);
            }
        } else {
            document.getElementById("add-veggie-fields").style.display = "block"
        }

    };

    var myWidget = window.cloudinary.createUploadWidget({
        cloudName: 'agrarify',
        uploadPreset: 'agrarify'
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info.url);
            const urlInfo = result.info.url;
            const uploadUrl = document.getElementById("upload-url");
            uploadUrl.value = urlInfo;
            setFormState({
                ...formState,
                ['photo']: uploadUrl.value
            });
        }
    }
    )

    const showUploadWidget = () => {
        myWidget.open();
    }

    return (
        <>
            <Form id="add-veggie-form" onSubmit={handleFormSubmit}>
                <label htmlFor="type">What kind of veggie?</label>
                <select name='type' onChange={handleChange}>
                    <option>select one</option>
                    <option value="apples">apples</option>
                    <option value="artichokes">artichokes</option>
                    <option value="asparagus">asparagus</option>
                    <option value="avocados">avocados</option>
                    <option value="basil">basil</option>
                    <option value="drybeans">beans - dry</option>
                    <option value="greenbeans">beans - green</option>
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
                <label htmlFor="quantity">How many?</label>
                <input
                    className="form-input"
                    placeholder="quantity"
                    name="quantity"
                    type="number"
                    value={formState.quantity}
                    onChange={handleChange}
                />
                <label htmlFor="photo">Paste a link to a photo (optional)</label>
                <input id="upload-url"
                    className="form-input"
                    placeholder="photo"
                    name="photo"
                    type="text"
                    value={formState.photo}
                    onChange={handleChange}
                />
                <label id="upload_widget" class="cloudinary-button" onClick={showUploadWidget}>Upload files</label>
                <label htmlFor="description">Short description</label>
                <textarea
                    className="form-input"
                    placeholder="description"
                    name="description"
                    type="text"
                    value={formState.description}
                    onChange={handleChange}
                />
                <div style={{ display: "none" }} id="add-veggie-fields" className="my-3 p-3 bg-danger text-white">
                    Please fill out all required fields
                </div>
                <button
                    className="button-primary"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                >
                    Submit
                </button>

            </Form>


            {error && (
                <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                </div>
            )}

        </>
    )
}

export default AddVeggieForm
