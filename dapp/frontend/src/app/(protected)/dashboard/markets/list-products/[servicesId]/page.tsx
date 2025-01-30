import React from 'react'
import withAuth from '../../../../../hoc/withAuth';

const page = () => {
  return (
    <div>
      This is a supplier
    </div>
  )
}

export default withAuth(page);