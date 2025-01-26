import React from 'react'
import withAuth from '../../../hoc/withAuth';

const page = () => {
  return (
    <div>
      These are the lists of Service Providers
    </div>
  )
}

export default withAuth(page);
