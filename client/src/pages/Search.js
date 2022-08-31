import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
// import { Link } from 'react-router-dom';
import VeggiesList from '../components/VeggiesList';
import { QUERY_VEGGIES } from '../utils/queries';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

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
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "500px", width: "" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  <button>idk button!</button>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </>
      )}
    </main>
  );
};

export default Search;
