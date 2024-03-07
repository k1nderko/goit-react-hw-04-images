import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41114250-186ebd042d251d6e26d9d298e';

export const getAllImagesApi = async (query, page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};
