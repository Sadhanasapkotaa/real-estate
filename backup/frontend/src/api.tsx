import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

console.log('BASE_URL:', BASE_URL); // Debugging statement

if (!BASE_URL) {
  console.error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

export const fetchData = async (endpoint: string) => {
  try {
    const token = localStorage.getItem('authToken'); // Retrieve the authentication token from local storage
    console.log('Auth Token:', token); // Debugging statement
    if (!BASE_URL) {
      throw new Error('BASE_URL is not defined');
    }
    const url = `${BASE_URL.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`;
    console.log('Request URL:', url); // Debugging statement
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the authentication token in the request headers
      },
    });
    console.log('Response Data:', response.data); // Debugging statement
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (axios.isAxiosError(error) && error.request && Object.keys(error.request).length) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
    } else if ((error as Error).message === 'Network Error') {
      // Handle network error specifically
      console.error('Network Error: Please check your internet connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
    throw error;
  }
};

export const fetchPropertyById = async (id: string) => {
  return fetchData(`properties/${id}`);
};

export const bookProperty = async (id: string, bookingData: { startDate: string, endDate: string }) => {
  try {
    const token = localStorage.getItem('authToken'); // Retrieve the authentication token from local storage
    console.log('Auth Token:', token); // Debugging statement
    const url = `${BASE_URL.replace(/\/+$/, '')}/properties/${id}/book/`;
    console.log('Request URL:', url); // Debugging statement
    const response = await axios.post(url, bookingData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the authentication token in the request headers
      },
    });
    console.log('Response Data:', response.data); // Debugging statement
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else if (error.request && Object.keys(error.request).length) {
        console.error('Error request:', error.request);
      } else if (error.message === 'Network Error') {
        console.error('Network Error: Please check your internet connection.');
      } else {
        console.error('Error message:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

export const addProperty = async (propertyData: {
  title: string;
  description: string;
  price: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  type: string;
  saleOrRent: string;
  images: File[];
}) => {
  try {
    const token = localStorage.getItem('authToken'); // Retrieve the authentication token from local storage
    console.log('Auth Token:', token); // Debugging statement
    if (!BASE_URL) {
      throw new Error('BASE_URL is not defined');
    }
    const url = `${BASE_URL.replace(/\/+$/, '')}/properties/`;
    const formData = new FormData();
    (Object.keys(propertyData) as (keyof typeof propertyData)[]).forEach((key) => {
      if (key === 'images') {
        propertyData.images.forEach((image) => {
          formData.append('images', image);
        });
      } else {
        formData.append(key, propertyData[key] as string | Blob);
      }
    });
    console.log('Form Data:', formData); // Debugging statement
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`, // Include the authentication token in the request headers
      },
    });
    console.log('Response Data:', response.data); // Debugging statement
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else if (error.request && Object.keys(error.request).length) {
      console.error('Error request:', error.request);
    } else if (error.message === 'Network Error') {
      console.error('Network Error: Please check your internet connection.');
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};
