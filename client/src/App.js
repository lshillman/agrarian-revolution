import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import MyVeggies from './pages/MyVeggies';
import Requests from './pages/Requests';
import Conversation from './pages/Conversation';
import Profile from './pages/Profile';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import Header from './components/Header';
import Footer from './components/Footer';


const client = new ApolloClient ({
  uri: '/graphql',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Header />

      <Routes>
        <Route
          path="/"
          element={<Search />}
        />
        <Route
          path="/veggies"
          element={<MyVeggies />}
        />
        <Route
          path="/requests"
          element={<Requests />}
        />
        <Route
          path="/requests/:requestId"
          element={<Conversation />}
        />
        <Route
          path="/profile/:username"
          element={<Profile />}
        />
      </Routes>

      <Footer />
    </Router>

    </ApolloProvider>
  );
}

export default App;
