import axios from 'axios';

const posts = axios.create({
  baseURL: 'http://localhost:3001/',
});
export default posts;
