// app/api/movies/route.js
import { NextResponse } from 'next/server';
import { TMDB_BASE_URL } from '@/constants/constants';

export async function GET(request) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type');

  const endpoints = {
    popularMovies: `${TMDB_BASE_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}`,
    topRatedMovies: `${TMDB_BASE_URL}/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`,
    actionMovies: `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=28`,
    comedyMovies: `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=35`,
    horrorMovies: `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=27`,
    popularSeries: `${TMDB_BASE_URL}/tv/popular?api_key=${process.env.TMDB_API_KEY}`,
    dramaSeries: `${TMDB_BASE_URL}/discover/tv?api_key=${process.env.TMDB_API_KEY}&with_genres=18`,
    sciFiSeries: `${TMDB_BASE_URL}/discover/tv?api_key=${process.env.TMDB_API_KEY}&with_genres=10765`,
    comedySeries: `${TMDB_BASE_URL}/discover/tv?api_key=${process.env.TMDB_API_KEY}&with_genres=35`,
  };

  const endpoint = endpoints[type];

  if (!endpoint) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch ${type}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
