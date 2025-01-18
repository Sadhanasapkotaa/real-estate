import axios from 'axios';

export const BASE_URL = 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
});