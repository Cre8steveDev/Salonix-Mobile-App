import axios from 'axios';

export const BASE_API = 'https://salonix-backend.onrender.com';

export default axios.create({ baseURL: BASE_API });
