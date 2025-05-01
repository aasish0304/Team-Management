import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Team Phoenix</h1>
        <p className="hero-subtitle">Manage your awesome team members here!</p>
        <div className="button-group">
          <Link to="/add" className="btn btn-primary">Add Member</Link>
          <Link to="/members" className="btn btn-secondary">View Members</Link>
        </div>
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          <h3>Add Members</h3>
          <p>Easily add new team members with their details</p>
        </div>
        <div className="feature-card">
          <h3>View Members</h3>
          <p>Browse through your team members list</p>
        </div>
        <div className="feature-card">
          <h3>Member Details</h3>
          <p>View detailed information about each member</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
