"use client";
import React, { useEffect, useState } from 'react';
// ...existing code...

const SupplierCard = ({ supplier }) => (
  <div className="supplier-card">
    <h3>{supplier.name}</h3>
    <p>{supplier.description}</p>
    <p>Contact: {supplier.phone_number}</p>
    <a href={supplier.maplink} target="_blank" rel="noopener noreferrer">View on Map</a>
    <br />
    <a href={supplier.website} target="_blank" rel="noopener noreferrer">Visit Website</a>
  </div>
);
const ListSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetch('https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/suppliers/')
      .then(response => response.json())
      .then(data => setSuppliers(data))
      .catch(error => console.error('Error fetching suppliers:', error));
  }, []);

  return (
    <div className="supplier-list">
      {suppliers.map((supplier) => (
        <SupplierCard key={supplier.id} supplier={supplier} />
      ))}
    </div>
  );
};

export default ListSuppliers;

// CSS styles
const styles = `
  .supplier-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .supplier-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    width: 200px;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
  }
  .supplier-card h3 {
    margin-top: 0;
  }
`;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
