import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BuyerDashboard.css'; // Import the CSS file

const BuyerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [maxPrice, setMaxPrice] = useState('');
  const [likedProperties, setLikedProperties] = useState(new Set());
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const buyerEmail = JSON.parse(localStorage.getItem('userInfo'))?.email;

  useEffect(() => {
    const fetchProperties = async () => {
      const { data } = await axios.get(`http://localhost:8080/api/properties?pageNumber=${page}`);
      setProperties(data.properties);
      setFilteredProperties(data.properties);
      setPages(data.pages);

    };
    fetchProperties();
  },  [page]);

  

  const handleInterest = async (propertyId) => {
    const property = properties.find((prop) => prop._id === propertyId);
    if (!buyerEmail) {
      alert('Buyer email not found. Please log in.');
      return;
    }
    try {
      
      await axios.post(`http://localhost:8080/api/properties/${propertyId}/interest`, { buyerEmail });
      alert(`Contact Seller: ${property.email}`+' Interest registered successfully. Seller\'s contact details sent to your email.');
    } catch (error) {
      console.error('Error registering interest:', error);
      alert('Failed to register interest. Please try again later.'+ error);
    }
  };


  const handleLike = async (propertyId) => {
    if (likedProperties.has(propertyId)) {
      // User has already liked this property, do nothing
      return;
    }
    try {
      const { data } = await axios.post(`http://localhost:8080/api/properties/${propertyId}/like`);
      const updatedProperties = properties.map(property =>
        property._id === propertyId ? { ...property, likes: data.likes } : property
      );
      const updatedFilteredProperties = filteredProperties.map(property =>
        property._id === propertyId ? { ...property, likes: data.likes } : property
      );
      setProperties(updatedProperties);
      setFilteredProperties(updatedFilteredProperties);
      setLikedProperties(new Set(likedProperties).add(propertyId));

    } catch (error) {
      console.error('Error liking property', error);
    }
  };
  
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePriceFilter = () => {
    const filtered = properties.filter((property) => property.price <= maxPrice);
    setFilteredProperties(filtered);
  };

  const handleRemoveFilter = () => {
    setMaxPrice('');
    setFilteredProperties(properties);
  };

  return (
    <div className="buyer-dashboard">
      <h1>Available Properties</h1>
      <div className="filter-container">
        <label htmlFor="priceFilter">Max Price: </label>
        <input
          type="number"
          id="priceFilter"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Enter max price"
        />
        <button onClick={handlePriceFilter}>Apply Filter</button>
        <button onClick={handleRemoveFilter}>Remove Filter</button>
      </div>
      <div className="property-list">
        {filteredProperties.map((property) => (
          <div key={property._id} className="property-item">
            <h2>{property.title}</h2>
            <p><strong>Description:</strong> {property.description}</p>
            <p><strong>Location:</strong> {property.location}</p>
            <p><strong>Price:</strong> ${property.price}</p>
            <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
            <p><strong>Area:</strong> {property.area} sq ft</p>
            <p><strong>Nearby:</strong> {property.nearby}</p>
            <p><strong>Likes: </strong> {property.likes}</p>
            <button onClick={() => handleLike(property._id)}>Like</button>
            <button onClick={() => handleInterest(property._id)}>I'm Interested</button>
          </div>
        ))}
      </div>
      <div className="pagination">
        {[...Array(pages).keys()].map((x) => (
          <button
            key={x + 1}
            className={x + 1 === page ? 'active' : ''}
            onClick={() => handlePageChange(x + 1)}
          >
            {x + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BuyerDashboard;
