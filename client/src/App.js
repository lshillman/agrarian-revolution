import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import MyVeggies from './pages/MyVeggies';
import Requests from './pages/Requests';
import Conversation from './pages/Conversation';
import Profile from './pages/Profile';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import AddVeggieForm from './components/AddVeggieForm';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client"
import Header from './components/Header';
import Footer from './components/Footer';
import { setContext } from '@apollo/client/link/context';
import VeggiesRequests from './components/VeggieRequests';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
          <Routes>
            <Route
              path="/"
              element={<Search/>}
            />
            <Route
              path="/veggies"
              element={<MyVeggies/>}
            />
            <Route
              path="/requests"
              element={<Requests/>}
            />
            <Route
              path="/requests/:requestId"
              element={<VeggiesRequests />}
            />
            <Route
              path="/profile/:username"
              element={<Profile/>}
            />
            <Route
              path="/addveggie"
              element={<AddVeggieForm />}
            />
            <Route
              path="/signup"
              element={<SignupForm/>}
            />
            <Route
              path="/login"
              element={<LoginForm />}
            />
          </Routes>
          <Footer />
        </Router>
    </ApolloProvider>
  );
}

export default App;
