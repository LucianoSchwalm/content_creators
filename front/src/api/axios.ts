import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3500/', // Altere para a URL do seu backend
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

export default instance;