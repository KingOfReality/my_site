    import React, { useEffect, useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import firebase from '../firebase'; 

    function SearchBar() {
      const navigate = useNavigate();
      const [isLoggedIn, setIsLoggedIn] = useState(false);

      useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User is logged in
            setIsLoggedIn(true);
          } else {
            // User is not logged in
            setIsLoggedIn(false);
          }
        });
      }, []);

      const handleSearch = async (e) => {
        e.preventDefault();

        try {
          // Perform search logic here

          // Navigate to the search results page
          navigate('/option');
        } catch (error) {
          console.log(error);
        }
      };
      const handleInfo = async (e) => {
        e.preventDefault();
        navigate('/info')
      }
      const handleLogout = async (e) => {
        e.preventDefault();

        try {
          await firebase.auth().signOut();
          navigate('/login');
        } catch (error) {
          console.error('Logout error:', error);
        }
      };

    

      return (
        <nav className="navbar navbar-expand-lg custom-navbar">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/bot" onClick={handleInfo}>
              TryMe
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/bot">
                    Bot
                  </Link>
                </li>
              </ul>
              <div className="d-flex align-items-center">
                {isLoggedIn ? (
                  <a href="#" onClick={handleLogout} className="me-2 btn btn-link">
                    Logout
                  </a>
                ) : (
                  <>
                    <Link to="/login" className="me-2 btn btn-primary">Login</Link>
                    <Link to="/signUp" className="me-2 btn btn-secondary">Signup</Link>
                  </>
                )}
                <form onSubmit={handleSearch} role="search">
                  <button className="btn btn-outline-light" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </nav>
      );
    }

    export default SearchBar;
