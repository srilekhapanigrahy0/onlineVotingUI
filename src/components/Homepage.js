import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to the Voting Application</h1>
      <p>Choose your login method:</p>

      <div style={{ marginBottom: '30px' }}>
        <h2>Admin Login (Google OAuth)</h2>
        <p>For administrators to manage users.</p>
        <a
          href="http://localhost:8080/oauth2/authorization/google"
          style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}
        >
          Login as Admin via Google
        </a>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>User Login (Email & Password)</h2>
        <p>For registered users to access voting features.</p>
        <Link
          to="/user-login" // New route for user login form
          style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' }}
        >
          Login as User
        </Link>
      </div>

      
    </div>
  );
}

export default HomePage;