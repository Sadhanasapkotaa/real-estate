import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ComponentType } from 'react';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
      const checkAuth = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          setIsAuthenticated(false);
          router.replace('/auth/login');
          return;
        }
        // TODO: Add token validation/expiry check here if needed
        setIsAuthenticated(true);
      };

      checkAuth();
    }, [router]);

    if (isAuthenticated === null) {
      // Initial loading state
      return <div>Loading...</div>; // Replace with your loading component
    }

    if (isAuthenticated === false) {
      return null; // Router will handle redirect
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;