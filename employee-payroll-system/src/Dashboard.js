import React from 'react';
import { useAuth } from './contexts/AuthContext'; // Import the useAuth hook
import { Navigate } from 'react-router-dom'; // Import the Navigate component
import './dashboard.css'; // Import the CSS file for styling

function Dashboard() {
  // Use the useAuth hook to access the currentUser and signOut function
  const { currentUser, signOut } = useAuth();

  // Handle sign-out functionality
  const handleSignOut = async () => {
    try {
      await signOut(); // Sign out the user
      // Navigate the user to the login page after signing out
      return <Navigate to="/" replace />;
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  // If currentUser is null (no user logged in), redirect to login page
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-content">
        <p className="dashboard-welcome">Welcome, {currentUser.email}</p>
        <p className="dashboard-user-id">User ID: {currentUser.uid}</p>
        <button className="dashboard-sign-out-btn" onClick={handleSignOut}>Sign Out</button> {/* Sign-out button */}
      </div>
    </div>
  );
}

export default Dashboard;
