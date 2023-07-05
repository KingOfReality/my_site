import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import firebase from '../firebase'; 

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const token = await response.user.getIdToken();

      console.log('Token:', token);

      // Redirect to the home page
      navigate('/home');
    } catch (error) {
      console.error('Sign up error:', error);
      // Handle the signup error
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('Email is already in use');
      } else {
        setErrorMessage('An error occurred during signup');
      }
    }
  };

  const handleSignUpWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      // User signed up successfully with Google
      navigate('/home');
    } catch (error) {
      console.error('Google sign up error:', error);
      setErrorMessage('An error occurred during Google sign up');
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <form onSubmit={handleSignUp}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
      <button onClick={handleSignUpWithGoogle} className="google-button btn btn-primary mt-3" style={{ display: 'flex', alignItems: 'center' }}>
        <img src="https://accounts.google.com/favicon.ico" alt="Google Icon" className="google-icon" style={{ marginRight: '8px' }} />
        <span className="google-text">Sign in with Google</span>
      </button>
      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
