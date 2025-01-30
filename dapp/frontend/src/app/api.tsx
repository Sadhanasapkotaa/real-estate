import axios from 'axios';

export const BASE_URL = 'https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/v1/roles/update';

export const api = axios.create({
  baseURL: BASE_URL,
});