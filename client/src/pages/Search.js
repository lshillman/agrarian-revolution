import React, { useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
// import { Link } from 'react-router-dom';
import VeggiesList from '../components/VeggiesList';
import VeggiePopup from '../components/VeggiePopup';
import AddVeggieForm from '../components/AddVeggieForm';
import { QUERY_VEGGIES } from '../utils/queries';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import icons from '../utils/icons';

// function LocationMarker() {
//   const [position, setPosition] = useState(null)
//   const map = useMapEvents({
//     click() {
//       map.locate()
//     },
//     locationfound(e) {
//       setPosition(e.latlng)
//       map.flyTo(e.latlng, map.getZoom())
//     },
//   })

//   return position === null ? null : (
//     <Marker position={position}>
//       <Popup>You are here</Popup>
//     </Marker>
//   )
// }

const Search = () => {
  const { loading, data } = useQuery(QUERY_VEGGIES);
  const veggies = data?.veggies || [];

  const selectedVeggie = useRef(null);
  const [veggieClicked, setVeggieClicked] = useState(false);

  const mapRef = useRef(null);
  const markerRef = useRef(new Array());

  const onClickShowMarker = (veggieIndex) => {
    const map = mapRef.current
    if (!map) {
      return
    }

    // map.flyTo(veggie.coordinates, 13)
    const marker = markerRef.current[veggieIndex]
    if (marker) {
      marker.openPopup()
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div id="top">
        <div id="top-search">
          <h2>Veggies Near You</h2>
          {/* <Button><Link to="/addveggie">Post Veggie</Link></Button> */}
          <Button variant="primary" onClick={handleShow}>
            Post Veggie
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post a Veggie</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <main id="search-pg" >
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div id="map-veg" style={{ maxWidth: "1000px" }}>
              <div id="veggie-list" style={{ flexBasis: "25%" }}>
                <VeggiesList veggies={veggies} veggieClicked={veggieClicked} selectedVeggie={selectedVeggie} onClickShowMarker={onClickShowMarker} />
              </div>

              <div id="map-cont" style={{ flexBasis: "75%" }}>
                <MapContainer center={[37.7749, -122.4194]} zoom={13} style={{ height: "500px" }} whenCreated={(map) => mapRef.current = map}>
                  {/* <LocationMarker /> */}
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {veggies.map((veggie) => (
                    <>
                      <Marker ref={(element) => markerRef.current.push(element)} position={veggie.coordinates} icon={icons[veggie.type]} data={veggie._id} eventHandlers={{
                        click: (e) => {
                          selectedVeggie.current = e.target.options.data;
                          setVeggieClicked(true);
                        },
                      }}>
                        <VeggiePopup veggie={veggie} />
                      </Marker>
                    </>
                  ))}
                </MapContainer>
              </div>
            </div>


          </>

        )}
      </main>
    </>
  );
};

export default Search;