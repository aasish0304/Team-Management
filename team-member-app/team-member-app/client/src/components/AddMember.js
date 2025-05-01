import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddMember.css';

const AddMember = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.email || !formData.image) {
      alert("All fields are required");
      return;
    }

    setIsSubmitting(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('role', formData.role);
    data.append('email', formData.email);
    data.append('image', formData.image);

    try {
      await axios.post('http://localhost:5000/api/members', data);
      alert("Member added successfully!");
      navigate('/members');
    } catch (err) {
      console.error(err);
      alert("Error adding member");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-member-container">
      <div className="form-card">
        <h2 className="form-title">Add New Team Member</h2>
        <form onSubmit={handleSubmit} className="member-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter member's name"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              id="role"
              name="role"
              type="text"
              placeholder="Enter member's role"
              onChange={handleChange}
              value={formData.role}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter member's email"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Profile Image</label>
            <div className="image-upload-container">
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {preview && (
                <div className="image-preview">
                  <img src={preview} alt="Preview" />
                </div>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Member'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMember;
