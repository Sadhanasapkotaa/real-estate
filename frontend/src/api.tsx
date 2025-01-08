import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

console.log('BASE_URL:', BASE_URL); // Debugging statement

if (!BASE_URL) {
  console.error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

export const fetchData = async (endpoint: string) => {
  try {
    const url = `${BASE_URL.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`;
    console.log('Request URL:', url); // Debugging statement
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        // You can add more headers here, e.g., authentication tokens if needed
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
    throw error;
  }
};
