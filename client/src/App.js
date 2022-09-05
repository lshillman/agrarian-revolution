import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import auth from './utils/auth'

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
            // TODO: replace the else w pretty page
            element={auth.loggedIn() ? <Search /> : <LoginForm />}
            // element={<Search />}
            // onEnter={requireAuth}
          />
          <Route
            path="/veggies"
            element={auth.loggedIn() ? <MyVeggies /> : <LoginForm />}
            // element={<MyVeggies />}
          />
          <Route
            path="/requests"
            element={auth.loggedIn() ? <Requests /> : <LoginForm />}
            // element={<Requests />}
          />
          <Route
            path="/requests/:requestId"
            element={auth.loggedIn() ? <VeggiesRequests /> : <LoginForm />}
            // element={<VeggiesRequests />}
          />
          <Route
            path="/profile/:username"
            element={auth.loggedIn() ? <Profile /> : <LoginForm />}
            // element={<Profile />}
          />
          <Route
            path="/signup"
            element={<SignupForm />}
          />
          <Route
            path="/login"
            element={<LoginForm />}
          />
          <Route
            path="/*"
            element={<Navigate replace to="/" />}
          />
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
