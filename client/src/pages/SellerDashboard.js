import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SellerDashboard.css';  // Import the CSS file

const SellerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    nearby: '',
  });

  // Fetch user ID from local storage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userId = userInfo ? userInfo._id : null;
  const userEmail = userInfo ? userInfo.email : null;

  useEffect(() => {
    const fetchProperties = async () => {
      if (!userId) {
        // Handle case where user ID is not available
        console.error('User ID not found');
        return;
      }
      const { data } = await axios.get('http://localhost:8080/api/properties');
      setProperties(data.filter((property) => property.seller === userId));
    };
    fetchProperties();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      // Handle case where user ID is not available
      console.error('User ID not found');
      return;
    }
    const { data } = await axios.post('http://localhost:8080/api/properties', {
      ...newProperty,
      seller: userId,
      email:userEmail,
    });
    setProperties([...properties, data]);
  };

  const handleDelete = async (propertyId) => {
    await axios.delete(`http://localhost:8080/api/properties/${propertyId}`);
    setProperties(properties.filter((property) => property._id !== propertyId));
  };

  return (
    <div className="dashboard">
      <h1>Your Properties</h1>
      <form className="property-form" onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Title'
          value={newProperty.title}
          onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
        />
        <textarea
          placeholder='Description'
          value={newProperty.description}
          onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
        />
        <input
          type='text'
          placeholder='Location'
          value={newProperty.location}
          onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
        />
        <input
          type='number'
          placeholder='Price'
          value={newProperty.price}
          onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
        />
        <input
          type='number'
          placeholder='Bedrooms'
          value={newProperty.bedrooms}
          onChange={(e) => setNewProperty({ ...newProperty, bedrooms: e.target.value })}
        />
        <input
          type='number'
          placeholder='Bathrooms'
          value={newProperty.bathrooms}
          onChange={(e) => setNewProperty({ ...newProperty, bathrooms: e.target.value })}
        />
        <input
          type='number'
          placeholder='Area'
          value={newProperty.area}
          onChange={(e) => setNewProperty({ ...newProperty, area: e.target.value })}
        />
        <input
          type='text'
          placeholder='Nearby'
          value={newProperty.nearby}
          onChange={(e) => setNewProperty({ ...newProperty, nearby: e.target.value })}
        />
        <button type='submit'>Add Property</button>
      </form>
      <ul className="property-list">
        {properties.map((property) => (
          <li key={property._id} className="property-item">
            <h2>{property.title}</h2>
            <p>{property.location}</p>
            <button className="delete-button" onClick={() => handleDelete(property._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerDashboard;
