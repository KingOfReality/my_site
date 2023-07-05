import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import firebase from './firebase'; // Import your Firebase configuration file
import SearchBar from './components/searchBar';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUp';
import TextList from './components/ListOfAtk';
import SearchComponent from './components/searchUrl';
import Bot from './components/bot';
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is logged in
        setUser(user);
      } else {
        // User is not logged in
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Router>
        <SearchBar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          {user ? (
            // Authenticated routes
            <>
              <Route path="/home" element={<TextList />} />
              <Route path="/option" element={<SearchComponent />} />
              <Route path="/bot" element={<Bot />} />
            </>
          ) : (
            // Routes accessible without authentication
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signUp" element={<SignUpPage />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
