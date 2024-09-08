// /components/SearchResultsList.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MovieDetails } from '@/types/types';

interface SearchResultsListProps {
  results: MovieDetails[];
}

const SearchResultsList = ({ results }: SearchResultsListProps) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {results.length > 0 ? (
        results.map((result) => (
          <Link
            href={`/details/${result.mediaType}/${result.id}`}
            key={result.id}
          >
            <li className="flex flex-col items-center space-y-2">
              <Image
                src={
                  result.poster_path
                    ? `https://image.tmdb.org/t/p/w200${result.poster_path}`
                    : '/images/movie-poster-placeholder.png'
                }
                alt={result.title || 'Movie Poster'}
                width={150}
                height={225}
                className="object-cover rounded-md"
              />
              <div className="text-gray-200 text-center">
                {result.title}
                <small className="block text-gray-500">
                  {result.mediaType === 'tv' ? 'TV Show' : 'Movie'}
                </small>
              </div>
            </li>
          </Link>
        ))
      ) : (
        <p className="text-gray-500 text-lg">No results found</p>
      )}
    </ul>
  );
};

export default SearchResultsList;
