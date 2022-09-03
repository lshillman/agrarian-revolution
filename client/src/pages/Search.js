import React, { useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import VeggiesList from '../components/VeggiesList';
import VeggiePopup from '../components/VeggiePopup';
import AddVeggieForm from '../components/AddVeggieForm';
import { QUERY_VEGGIES } from '../utils/queries';
import { Button, Modal } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import icons from '../utils/icons';

const userCoords = JSON.parse(localStorage.getItem("coordinates"));
// const userLoc = localStorage.getItem("location");
// const userId = localStorage.getItem("_id");
const userUsername = localStorage.getItem("username");
// const userEmail = localStorage.getItem("email");

const Search = () => {
  const { loading, data } = useQuery(QUERY_VEGGIES);
  const veggies = data?.veggies || [];

  const selectedVeggie = useRef(null);

  const mapRef = useRef(null);
  // const markerRef = useRef(new Array());
  const markerRef = useRef([]);

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
                <VeggiesList veggies={veggies}selectedVeggie={selectedVeggie} onClickShowMarker={onClickShowMarker} userUsername={userUsername} />
              </div>

              <div style={{ flexBasis: "75%" }}>
                <MapContainer center={userCoords || [37.87114171034828, -122.27379801035863]} zoom={13} style={{ height: "500px" }} whenCreated={(map) => mapRef.current = map}>
                  <TileLayer
                    attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                  />

                  {veggies.map((veggie, key) => {
                    if (veggie.owner.username !== userUsername) {
                      return <Marker key={key} ref={(element) => markerRef.current.push(element)} position={veggie.coordinates} icon={icons[veggie.type]} data={veggie._id}>
                        <VeggiePopup veggie={veggie} />
                      </Marker>
                    }
                    return <React.Fragment key={key}></React.Fragment>;

                  })}
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