import React, { useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
// import { Link } from 'react-router-dom';
import VeggiesList from '../components/VeggiesList';
import VeggiePopup from '../components/VeggiePopup';
import AddVeggieForm from '../components/AddVeggieForm';
import { QUERY_VEGGIES } from '../utils/queries';
import { Button, Modal } from 'react-bootstrap';


import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { L } from 'leaflet';
import icons from '../utils/icons';

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

  const [showModal, setShowModal] = useState(false);

  // var layer = new L.StamenTileLayer("watercolor")
  // L.tileLayer.provider('Stamen.Watercolor').addTo(mapRef.current);

  return (
    <>
      <div id="top">
        <div id="top-search">
          <h2>Veggies Near You</h2>
          {/* <Button><Link to="/addveggie">Post Veggie</Link></Button> */}
          <Button onClick={() => setShowModal(true)}>
            Post Veggie
          </Button>
        </div>
      </div>

      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='veggie-modal'>

        <Modal.Header closeButton>
          <Modal.Title>Post a Veggie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddVeggieForm handleModalClose={() => setShowModal(false)} />
        </Modal.Body>

      </Modal>

      <main id="search-pg" >
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div id="map-veg" style={{ maxWidth: "1200px" }}>
              <div id="veggie-div" style={{ flexBasis: "25%" }}>
                <VeggiesList veggies={veggies} veggieClicked={veggieClicked} selectedVeggie={selectedVeggie} onClickShowMarker={onClickShowMarker} />
              </div>

              <div style={{ flexBasis: "75%" }}>
                <MapContainer center={JSON.parse(localStorage.getItem("coordinates"))} zoom={13} style={{ height: "500px" }} whenCreated={(map) => mapRef.current = map}>
                  {/* <LocationMarker /> */}
                  
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png"
                  />

                  {veggies.map((veggie, key) => (

                    <Marker key={key} ref={(element) => markerRef.current.push(element)} position={veggie.coordinates} icon={icons[veggie.type]} data={veggie._id} eventHandlers={{
                      click: (e) => {
                        selectedVeggie.current = e.target.options.data;
                        setVeggieClicked(true);
                      },
                    }}>
                      <VeggiePopup veggie={veggie} />
                    </Marker>

                  ))}
                </MapContainer>
              </div>
            </div>

            {/* <AddVeggieForm /> */}

          </>

        )}
      </main>
    </>
  );
};

export default Search;