import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../../../../hoc/withAuth'; // Adjust the import path as needed

const SupplierDetails = () => {
  const router = useRouter();
  const { supplierId } = router.query;
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    if (supplierId) {
      // Fetch supplier details from API or data source
      fetch(`/api/suppliers/${supplierId}`)
        .then(response => response.json())
        .then(data => setSupplier(data))
        .catch(error => console.error('Error fetching supplier details:', error));
    }
  }, [supplierId]);

  if (!supplier) {
    return <div>Loading...</div>;
  }

  return (
    <div className="supplier-details">
      <h1>{supplier.name}</h1>
      <p>{supplier.description}</p>
      <p>Contact: {supplier.contact}</p>
      {/* Add more supplier details as needed */}
    </div>
  );
};

export default withAuth(SupplierDetails);