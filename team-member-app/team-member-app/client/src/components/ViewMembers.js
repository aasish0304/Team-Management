import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ViewMembers.css';

const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/members')
      .then((res) => {
        setMembers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleImageError = (memberId) => {
    setImageErrors(prev => ({
      ...prev,
      [memberId]: true
    }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading team members...</p>
      </div>
    );
  }

  return (
    <div className="view-members-container">
      <h2 className="section-title">Our Team Members</h2>
      <div className="members-grid">
        {members.map((member) => (
          <div key={member._id} className="member-card">
            <div className="member-image-container">
              {imageErrors[member._id] ? (
                <div className="member-image-placeholder">
                  {member.name.charAt(0).toUpperCase()}
                </div>
              ) : (
                <img 
                  src={`http://localhost:5000/uploads/${member.image}`}
                  alt={member.name}
                  className="member-image"
                  onError={() => handleImageError(member._id)}
                  loading="lazy"
                />
              )}
            </div>
            <div className="member-info">
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <Link to={`/members/${member._id}`} className="btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMembers;
