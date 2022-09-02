import React, { useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
// import { Link } from 'react-router-dom';
import VeggiesList from '../components/VeggiesList';
import VeggiePopup from '../components/VeggiePopup';
import AddVeggieForm from '../components/AddVeggieForm';
import { QUERY_VEGGIES } from '../utils/queries';

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
  const markerRef = useRef(null);

  const onClickShowMarker = () => {
    const map = mapRef.current
    if (!map) {
      return
    }

    // map.flyTo(veggie.coordinates, 13)
    const marker = markerRef.current
    if (marker) {
      marker.openPopup()
    }
  }

  return (
    <main style={{ maxWidth: "1200px", display: "flex" }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div style={{ flexBasis: "20%" }}>
            <VeggiesList veggies={veggies} veggieClicked={veggieClicked} selectedVeggie={selectedVeggie} onClickShowMarker={onClickShowMarker} />
          </div>

          <div style={{ flexBasis: "80%" }}>
            <MapContainer center={[37.7749, -122.4194]} zoom={13} style={{ height: "500px" }} whenCreated={(map) => mapRef.current = map}>
              {/* <LocationMarker /> */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {veggies.map((veggie) => (
                <>
                  <Marker ref={markerRef} position={veggie.coordinates} icon={icons[veggie.type]} data={veggie._id} eventHandlers={{
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

          <AddVeggieForm />
        </>
      )}
    </main>
  );
};

export default Search;
