"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { MovieDetails } from "@/types/types"; // Import your MovieDetails type
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<MovieDetails[]>([]);
  const router = useRouter();
  // Fetch search results using SWR
  const { data: searchResults, error } = useSWR(
    searchQuery ? `/api/search?query=${searchQuery}` : null,
    fetcher
  );

  useEffect(() => {
    if (searchResults) {
      setResults(searchResults);
    } else if (error) {
      console.error("Error fetching search results:", error);
    }
  }, [searchResults, error]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleShowMoreClick = () => {
    setIsOpen(false);
    setSearchQuery("");
    router.push(`/search-results?query=${searchQuery}`);
  };

  return (
    <div className="bg-black p-4 flex justify-end">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-200 hover:bg-gray-800"
          >
            <Search className="h-5 w-5 cypress-search-button" />
            <span className="sr-only">Search</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 bg-black border-gray-800">
          <div className="flex items-center border-b border-gray-800">
            <Search className="h-5 w-5 ml-3 text-gray-400" />
            <Input
              type="search"
              placeholder="Titles, people, genres"
              value={searchQuery}
              onChange={handleSearchChange}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-200 bg-black placeholder:text-gray-500 cypress-search-input"
            />
          </div>
          <div className="p-4">
            {results.length > 0 ? (
              <>
                <ul className="space-y-2 ">
                  {results.map((result) => (
                    <li key={result.id} className="flex items-center space-x-4 cypress-search-result">
                      <Link
                        href={`/details/${result.mediaType}/${result.id}`}
                        className="flex items-center space-x-4 cypress-search-result-item"
                        onClick={() => {
                          setIsOpen(false);
                          setSearchQuery("");
                        }}
                      >
                        <Image
                          src={
                            result.poster_path
                              ? `https://image.tmdb.org/t/p/w200${result.poster_path}`
                              : "/images/movie-poster-placeholder.png"
                          }
                          alt={"Poster of " + result.title}
                          className="w-12 h-18 object-cover"
                          width={12}
                          height={12}
                        />
                        <div className="text-gray-200">
                          {result.title}
                          <small className="block text-gray-500">
                            {result.mediaType === "tv" ? "TV Show" : "Movie"}
                          </small>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleShowMoreClick}
                  className="mt-4 text-blue-500 hover:underline cypress-show-more-button"
                >
                  Show more results
                </button>
              </>
            ) : (
              <p className="text-gray-500 text-sm">No results found</p>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
