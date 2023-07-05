import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import firebase from '../firebase'; // Import your Firebase configuration file

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      const token = await response.user.getIdToken();

      // Store the token or perform any necessary actions
      console.log('Token:', token);

      // Redirect to the home page
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      // Handle the login error
    }
  };

  const handleLoginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      // User logged in successfully with Google
      navigate('/home');
    } catch (error) {
      console.error('Google login error:', error);
      // Handle the Google login error
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <button onClick={handleLoginWithGoogle} className="google-button btn btn-primary mt-3" style={{ display: 'flex', alignItems: 'center' }}>
  <img src="https://accounts.google.com/favicon.ico" alt="Google Icon" className="google-icon" style={{ marginRight: '8px' }} />
  <span className="google-text">Sign in with Google</span>
</button>

      <p className="mt-3">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
