import React from 'react';
import withAuth from '../../../../../../hoc/withAuth'; // Adjust the import path as needed

const page = () => {
  return (
    <div>
      Page
    </div>
  )
}

export default withAuth(page);
