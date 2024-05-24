import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyPage = ({ match }) => {
  const [property, setProperty] = useState({});

  useEffect(() => {
    const fetchProperty = async () => {
      const { data } = await axios.get(`/api/properties/${match.params.id}`);
      setProperty(data);
    };
    fetchProperty();
  }, [match.params.id]);

  return (
    <div>
      <h1>{property.title}</h1>
      <p>{property.description}</p>
      <p>Location: {property.location}</p>
      <p>Price: {property.price}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      <p>Area: {property.area} sqft</p>
      <p>Nearby: {property.nearby}</p>
    </div>
  );
};

export default PropertyPage;
