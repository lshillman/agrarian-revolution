import React, { useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import VeggiesList from '../components/VeggiesList';
import VeggiePopup from '../components/VeggiePopup';
import { QUERY_VEGGIES } from '../utils/queries';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import icons from '../utils/icons';
import PostVeggieModal from '../components/PostVeggieModal';

const userCoords = JSON.parse(localStorage.getItem("coordinates"));
// const userLoc = localStorage.getItem("location");
// const userId = localStorage.getItem("_id");
const userUsername = localStorage.getItem("username");
// const userEmail = localStorage.getItem("email");

const Search = () => {
  const { loading, data } = useQuery(QUERY_VEGGIES);
  const veggies = data?.veggies || [];

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

  const selectClickedMarker = (e) => {
    // grabs veggie id of marker we clicked
    document.querySelector(`[data-id = "${e.target.options.data}"]`).parentElement.previousSibling.checked = true
  }

  return (
    <>
      <main id="search-pg" >
        <div id="top-search">
          <h2>Veggies Near You</h2>
          <PostVeggieModal />
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div id="map-veg" style={{ maxWidth: "1200px" }}>
              <div id="veggie-sidebar">
                <VeggiesList veggies={veggies} onClickShowMarker={onClickShowMarker} userUsername={userUsername} />
              </div>

              <div style={{ flexBasis: "75%" }}>
                <MapContainer center={userCoords || [37.87114171034828, -122.27379801035863]} zoom={13} style={{ height: "500px" }} whenCreated={(map) => mapRef.current = map}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  />

                  {veggies.map((veggie, key) => {
                    if (veggie.owner.username !== userUsername) {
                      return <Marker key={key} ref={(element) => markerRef.current.push(element)} position={veggie.coordinates} icon={icons[veggie.type]} data={veggie._id} eventHandlers={{
                        click: (e) => {
                          selectClickedMarker(e)
                        },
                      }}>
                        <VeggiePopup veggie={veggie} />
                      </Marker>
                    }
                    return <React.Fragment key={key}></React.Fragment>;

                  })}
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