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


export const fetchMovieDetails = async (movieId: string, type: 'movie' | 'tv') => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/${type}/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
