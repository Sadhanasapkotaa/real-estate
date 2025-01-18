import React from 'react';
// ...existing code...

const suppliers = [
  // ...example supplier data...
];

const SupplierCard = ({ supplier }) => (
  <div className="supplier-card">
    <h3>{supplier.name}</h3>
    <p>{supplier.description}</p>
    <p>{supplier.contact}</p>
  </div>
);

const ListSuppliers = () => {
  return (
    <div className="supplier-list">
      {suppliers.map((supplier, index) => (
        <SupplierCard key={index} supplier={supplier} />
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
