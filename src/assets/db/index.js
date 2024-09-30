import axios from 'axios';

async function getUser() {
  try {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL + '/search'
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export default getUser;
