// app/api/similar/route.js
import { NextResponse } from 'next/server';
import { TMDB_BASE_URL } from '@/constants/constants';

export async function GET(request) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const id = url.searchParams.get('id');

  if (!type || !id) {
    return NextResponse.json({ error: 'Missing type or id parameter' }, { status: 400 });
  }

  const endpoint = `${TMDB_BASE_URL}/${type}/${id}/similar?api_key=${process.env.TMDB_API_KEY}`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch similar ${type}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
