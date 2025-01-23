import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        router.push('/auth/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;