import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';

const ActivateAccount = () => {
  const router = useRouter();
  const { uid, token } = router.query;

  useEffect(() => {
    if (uid && token) {
      const activateAccount = async () => {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/users/activation/`, {
            uid,
            token,
          });
          if (response.status === 204) {
            alert('Account activated successfully!');
            router.push('/login');  // Redirect to login page after successful activation
          }
        } catch (error) {
          alert('Activation failed. Please try again.');
        }
      };

      activateAccount();
    }
  }, [uid, token, router]);

  return (
    <div>
      <h2>Activating your account...</h2>
    </div>
  );
};

export default ActivateAccount;
