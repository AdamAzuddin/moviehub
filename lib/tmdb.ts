import { TMDB_BASE_URL } from '@/constants/constants';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const apiClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchMovies = async (endpoint: string, params: object = {}) => {
  try {
    const response = await apiClient.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from TMDb:', error);
    throw error;
  }
};
