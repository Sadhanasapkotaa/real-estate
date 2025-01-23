import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MaterialsList.css';

const MaterialsList = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios.get('https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/materials/')
      .then(response => {
        setMaterials(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the materials!', error);
      });
  }, []);

  return (
    <div className="materials-list">
      {materials.map(material => (
        <div key={material.id} className="material-card">
          <img src={material.material_image} alt={material.name} className="material-image" />
          <h2>{material.name}</h2>
          <p>Price: {material.price} {material.price_unit}</p>
          <p>Supplier: {material.supplier.name}</p>
          <a href={`/materials/${material.id}`} className="see-more-link">See more</a>
        </div>
      ))}
    </div>
  );
};

export default MaterialsList;
