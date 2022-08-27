import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';


const client = new ApolloClient ({
  uri: '/graphql',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <Home />
  );
}

export default App;
