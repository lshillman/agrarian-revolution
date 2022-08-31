import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
// import { Link } from 'react-router-dom';
import VeggiesList from '../components/VeggiesList';
import { QUERY_VEGGIES } from '../utils/queries';

const Search = () => {
  const { loading, data } = useQuery(QUERY_VEGGIES);
  const veggies = data?.veggies || [];

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <VeggiesList veggies={veggies} />
        </div>
      )}
    </div>
  );
};

export default Search;
