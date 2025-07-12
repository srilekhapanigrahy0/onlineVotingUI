import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function DashboardPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [message, setMessage] = useState('');
  const [roles, setRoles] = useState([]); // State to store user roles
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:8080/api/users/user', { withCredentials: true });
        setUserInfo(userResponse.data);
        console.log(userResponse)

        // Fetch roles (you might need a new backend endpoint for this)
        // For now, let's assume /api/roles returns ["ROLE_USER"] or ["ROLE_ADMIN"]
        const rolesResponse = await axios.get('http://localhost:8080/api/users/roles', { withCredentials: true });
        setRoles(rolesResponse.data);

        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        if (err.response && err.response.status === 401) {
          console.log('Unauthorized. Redirecting to home/login.');
          // This is the ideal way for Spring to handle it
          // For basic auth, you might explicitly redirect to your user login page
          // For OAuth2, the backend will initiate the redirect
          navigate('/'); // Redirect to home, let user choose login
        } else {
          setMessage('Failed to load protected data.');
        }
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/logout', {}, { withCredentials: true });
      setUserInfo(null);
      setMessage('');
      setRoles([]);
      alert("Logged out successfully!");
      navigate('/');
    } catch (err) {
      console.error('Error during logout:', err);
      alert('Error during logout. See console for details.');
    }
  };

  const isAdmin = roles.includes('ROLE_ADMIN');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Dashboard</h1>
      {error ? (
        <div style={{ color: 'red', border: '1px solid red', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
          <p>Error: {error.message}</p>
          <p>Please log in to access this page.</p>
          <p>
            <Link to="/">Go to Home Page</Link>
          </p>
        </div>
      ) : (
        <>
          <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h2>User Info from Backend:</h2>
            {userInfo ? (
              <>
                <p><strong>Name:</strong> {userInfo.name}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Roles:</strong> {roles.join(', ')}</p>
                {userInfo.picture && (
                    <img
                        src={userInfo.picture}
                        alt="Profile"
                        style={{ borderRadius: '50%', width: '50px', height: '50px', objectFit: 'cover', marginTop: '10px' }}
                    />
                )}
              </>
            ) : (
              <p>Loading user info...</p>
            )}
          </div>

          <div style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
            <h3>Message from Spring Boot Backend:</h3>
            <p style={{ fontWeight: 'bold', color: '#28a745' }}>{message}</p>
          </div>

          {/* Admin Panel (Conditionally Rendered) */}
          {isAdmin && <AdminPanel />}

          <button
            onClick={handleLogout}
            style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Logout
          </button>
          <button
            onClick={() => navigate('/')}
            style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}
          >
            Go to Home
          </button>
        </>
      )}
    </div>
  );
}

// Dummy component for Admin Panel - implement actual logic here
function AdminPanel() {
    const [usersToUpload, setUsersToUpload] = useState('');
    const [uploadMessage, setUploadMessage] = useState('');

    const handleUploadUsers = async () => {
        try {
            // Example format: email,role (one per line)
            const userDataArray = usersToUpload.split('\n').map(line => {
                const [email, role] = line.split(',').map(s => s.trim());
                return { email, role: role || 'USER' }; // Default role to USER
            }).filter(user => user.email); // Filter out empty lines

            const response = await axios.post('http://localhost:8080/admin/users/upload', userDataArray, { withCredentials: true });
            setUploadMessage(response.data);
        } catch (err) {
            console.error('Error uploading users:', err.response ? err.response.data : err.message);
            setUploadMessage('Error: ' + (err.response ? err.response.data : err.message));
        }
    };

    return (
        <div style={{ border: '1px solid #007bff', padding: '15px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#e6f7ff' }}>
            <h3>Admin Panel: User Management</h3>
            <p>Enter user emails and roles (e.g., "user1@example.com,USER" or "admin@example.com,ADMIN"), one per line:</p>
            <textarea
                value={usersToUpload}
                onChange={(e) => setUsersToUpload(e.target.value)}
                rows="5"
                cols="50"
                placeholder="email1@example.com,USER&#10;email2@example.com,USER&#10;admin@example.com,ADMIN"
                style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
            ></textarea>
            <button
                onClick={handleUploadUsers}
                style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Upload Users
            </button>
            {uploadMessage && <p style={{ marginTop: '10px', color: 'green' }}>{uploadMessage}</p>}
        </div>
    );
}


export default DashboardPage;