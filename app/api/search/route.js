// app/api/search/route.js
import { NextResponse } from 'next/server';
import { TMDB_BASE_URL } from '@/constants/constants';

export async function GET(request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    // Fetch data from TMDB
    const response = await fetch(
      `${TMDB_BASE_URL}/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${query}`
    );

    // Check for successful response
    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch search results` }, { status: response.status });
    }

    // Parse response
    const data = await response.json();

    // Map API response to MovieDetails type
    const moviesAndTVShows = data.results
      .slice(0, 5) // Limit to top 5 results
      .map(item => ({
        id: item.id,
        title: item.title || item.name, // For movies, it's `title`, for TV shows it's `name`
        poster_path: item.poster_path,
        mediaType: item.media_type === 'tv' ? 'tv' : 'movie', // Determine if it's TV or movie
      }));

    // Return transformed data
    return NextResponse.json(moviesAndTVShows);
  } catch (error) {
    console.error("Error fetching data from TMDB", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
