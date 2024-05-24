import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BuyerDashboard = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data } = await axios.get('http://localhost:8080/api/properties');
      setProperties(data);
    };
    fetchProperties();
  }, []);

  const handleInterest = (propertyId) => {
    const property = properties.find((prop) => prop._id === propertyId);
    if (property) {
      alert(`Contact Seller: ${property.email}`);
      console.log(property);
    }
  };

  return (
    <div>
      <h1>Available Properties</h1>
      {properties.map((property) => (
        <div key={property._id}>
          <h2>{property.title}</h2>
          <p>{property.description}</p>
          <button onClick={() => handleInterest(property._id)}>I'm Interested</button>
        </div>
      ))}
    </div>
  );
};

export default BuyerDashboard;
