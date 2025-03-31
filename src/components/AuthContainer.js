import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import './Auth.css';

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleAuthSuccess = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // If user is logged in, show logged in state
  if (user) {
    return (
      <div className="auth-form-container">
        <h2>Welcome, {user.displayName || 'User'}</h2>
        <p>You are now logged in!</p>
        <button className="auth-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div>
      {isLogin ? (
        <>
          <Login onLoginSuccess={handleAuthSuccess} />
          <div className="auth-switch">
            Don't have an account?
            <a href="#signup" onClick={(e) => { e.preventDefault(); toggleAuthMode(); }}>
              Sign up
            </a>
          </div>
        </>
      ) : (
        <>
          <Signup onSignupSuccess={handleAuthSuccess} />
          <div className="auth-switch">
            Already have an account?
            <a href="#login" onClick={(e) => { e.preventDefault(); toggleAuthMode(); }}>
              Log in
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthContainer; 