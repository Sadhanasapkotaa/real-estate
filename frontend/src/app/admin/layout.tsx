import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
      <div>
          <h1>Admin Nav</h1>
          <main>{children}</main>
          <h1>Footer</h1>
      </div>
  )
}

export default layout