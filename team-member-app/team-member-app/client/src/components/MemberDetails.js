import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MemberDetails.css';

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/members/${id}`)
      .then((res) => {
        setMember(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading member details...</p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="error-container">
        <h2>Member not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/members')}>
          Back to Members
        </button>
      </div>
    );
  }

  return (
    <div className="member-details-container">
      <div className="member-details-card">
        <div className="member-image-container">
          {imageError ? (
            <div className="member-image-placeholder">
              {member.name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <img 
              src={`http://localhost:5000/uploads/${member.image}`} 
              alt={member.name} 
              className="member-image"
              onError={handleImageError}
              loading="lazy"
            />
          )}
        </div>
        
        <div className="member-info">
          <h2 className="member-name">{member.name}</h2>
          <div className="info-group">
            <span className="info-label">Role</span>
            <span className="info-value">{member.role}</span>
          </div>
          <div className="info-group">
            <span className="info-label">Email</span>
            <a href={`mailto:${member.email}`} className="info-value email">
              {member.email}
            </a>
          </div>
        </div>

        <button 
          className="btn btn-secondary back-btn"
          onClick={() => navigate('/members')}
        >
          Back to Members
        </button>
      </div>
    </div>
  );
};

export default MemberDetails;
