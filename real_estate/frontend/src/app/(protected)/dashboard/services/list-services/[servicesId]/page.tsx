import React from 'react';
import withAuth from '../../../../../hoc/withAuth'; // Adjust the import path as needed

const page = () => {
  return (
    <div>
      This is a supplier
    </div>
  )
}

export default withAuth(page);