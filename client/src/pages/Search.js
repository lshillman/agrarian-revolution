import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
// import { Link } from 'react-router-dom';
import VeggiesList from '../components/VeggiesList';
import { QUERY_VEGGIES } from '../utils/queries';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import icons from '../utils/icons';

const spinach = new Icon({
  iconUrl: require("../utils/icons/spinach.png").default,
  iconSize: [27, 27]
});


const Search = () => {
  const { loading, data } = useQuery(QUERY_VEGGIES);
  const veggies = data?.veggies || [];

  return (
    <main style={{ maxWidth: "1200px", display: "flex" }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div style={{ flexBasis: "20%"}}>
            <VeggiesList veggies={veggies} />
          </div>

          <div style={{ flexBasis: "80%"}}>
            <MapContainer center={[37.7749, -122.4194]} zoom={13} style={{ height: "500px" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {console.log(veggies[veggies.length-1].coordinates)}
              {veggies.map((veggie) => (
                <>
              {console.log(spinach)}
              <Marker position={veggie.coordinates} icon={icons[veggie.type]}>
                <Popup>
                  <h4>{veggie.type}</h4>
                  <button>Request</button>
                </Popup>
              </Marker>
              </>
            ))}
            </MapContainer>
          </div>
        </>
      )}
    </main>
  );
};

export default Search;
