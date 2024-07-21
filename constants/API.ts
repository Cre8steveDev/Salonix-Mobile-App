import axios from 'axios';

export const BASE_API = 'http://192.168.217.252:3000/';

export default axios.create({ baseURL: BASE_API });
